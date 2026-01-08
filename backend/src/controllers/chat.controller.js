import { SopChunk } from "../models/SopChunk.js";
import { generateAnswer } from "../services/llm.service.js";

export const chatWithSop = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const chunks = await SopChunk.find().limit(5);

    if (!chunks.length) {
      return res.status(400).json({ error: "No SOP uploaded yet" });
    }

    const answer = await generateAnswer(question, chunks);

    res.json({
      answer,
      sources: chunks.map(c => c.source)
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate answer" });
  }
};
