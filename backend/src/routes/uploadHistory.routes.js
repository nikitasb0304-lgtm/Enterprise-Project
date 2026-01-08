import express from "express";
import SOP from "../models/sop.model.js";

const router = express.Router();

router.get("/list/:userId", async (req, res) => {
  try {
    const files = await Upload.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("Upload list error:", err);
    res.status(500).json({ error: "Failed to load user uploads" });
  }
});

export default router;
