import mongoose from "mongoose";

const sopSchema = new mongoose.Schema(
  {
    title: String,
    content: String, // extracted text
    source: String,  // file name
  },
  { timestamps: true }
);

export default mongoose.model("SOP", sopSchema);
