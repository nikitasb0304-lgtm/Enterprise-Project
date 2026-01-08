import mongoose from "mongoose";

const sopChunkSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    embedding: {
      type: [Number],
      required: true
    }
  },
  { timestamps: true }
);

export const SopChunk = mongoose.model("SopChunk", sopChunkSchema);
