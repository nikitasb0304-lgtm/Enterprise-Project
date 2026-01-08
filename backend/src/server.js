import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import chatHistoryRoutes from "./routes/chatHistory.routes.js";
import uploadHistoryRoutes from "./routes/uploadHistory.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatHistoryRoutes);
app.use("/api/upload", uploadHistoryRoutes);

dotenv.config();
console.log("GEMINI KEY LOADED:", process.env.GEMINI_API_KEY?.slice(0, 10));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(PORT, () => {
      console.log(`🚀 OpsMind AI Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });