import express from "express";
import multer from "multer";
import pdf from "pdf-parse";
import SOP from "../models/sop.model.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Validate file type
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ 
        error: "Invalid file type. Only PDF files are allowed.",
        received: req.file.mimetype
      });
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ 
        error: "File too large. Maximum size is 10MB.",
        received: `${(req.file.size / 1024 / 1024).toFixed(2)}MB`
      });
    }

    if (req.file.size === 0) {
      return res.status(400).json({ error: "Uploaded file is empty" });
    }

    // Parse PDF
    let data;
    try {
      data = await pdf(req.file.buffer);
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError);
      
      // Provide more specific error messages
      if (pdfError.message && pdfError.message.includes("bad XRef entry")) {
        return res.status(400).json({ 
          error: "Invalid or corrupted PDF file. The PDF structure is malformed.",
          details: "The PDF may be corrupted, encrypted, or in an unsupported format. Please try a different PDF file."
        });
      }
      
      if (pdfError.message && pdfError.message.includes("Encrypted")) {
        return res.status(400).json({ 
          error: "PDF is password-protected.",
          details: "Please remove the password protection from the PDF before uploading."
        });
      }

      return res.status(400).json({ 
        error: "Failed to parse PDF file.",
        details: pdfError.message || "Unknown PDF parsing error"
      });
    }

    // Validate parsed content
    if (!data || !data.text || data.text.trim().length === 0) {
      return res.status(400).json({ 
        error: "PDF appears to be empty or contains no extractable text.",
        details: "The PDF may be image-based or corrupted."
      });
    }

    // Save to database
    const sop = await SOP.create({
      title: req.file.originalname,
      content: data.text,
      source: req.file.originalname,
    });

    res.json({
      message: "SOP uploaded and stored successfully",
      sopId: sop._id,
      pageCount: data.numpages,
      textLength: data.text.length
    });
  } catch (err) {
    console.error("Upload error:", err);
    
    // Database errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ 
        error: "Validation error",
        details: err.message 
      });
    }

    res.status(500).json({ 
      error: "Failed to process SOP",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

export default router;
