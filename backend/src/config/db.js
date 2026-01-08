import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    if (!env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB Atlas connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
