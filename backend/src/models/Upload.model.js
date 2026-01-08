import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Upload", UploadSchema);
