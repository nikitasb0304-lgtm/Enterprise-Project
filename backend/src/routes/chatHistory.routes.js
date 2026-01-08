import express from "express";
import ChatHistory from "../models/chatHistory.model.js";

const router = express.Router();

// GET chat history per user
router.get("/history/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.params.userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to load history" });
  }
});

// SAVE a chat
router.post("/save", async (req, res) => {
  try {
    const { userId, messages } = req.body;
    await Chat.create({ user: userId, messages });
    res.json({ success: true });
  } catch (err) {
    console.error("Chat save error:", err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

export default router;
