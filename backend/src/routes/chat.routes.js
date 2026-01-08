import express from "express";
import SOP from "../models/sop.model.js";
import { askGemini } from "../services/gemini.service.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const sops = await SOP.find().limit(3);
    const context = sops.map(s => s.content).join("\n");

    const prompt = `
You are an enterprise SOP assistant.
Use the following SOP content to answer the question.

SOP CONTENT:
${context}

QUESTION:
${question}
`;

    const answer = await askGemini(prompt);
    res.json({ answer });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate answer" });
  }
});

export default router;
