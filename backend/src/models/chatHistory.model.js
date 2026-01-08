import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },  // store logged user
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatHistory", chatHistorySchema);
