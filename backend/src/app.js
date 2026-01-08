import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sop", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Debug route to list available models
app.get("/api/debug/models", async (req, res) => {
  try {
    const { listAvailableModels } = await import("./services/gemini.service.js");
    const models = await listAvailableModels();
    res.json({ 
      availableModels: models,
      message: "Use these model names in your service files"
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to list models",
      message: error.message 
    });
  }
});

export default app;
