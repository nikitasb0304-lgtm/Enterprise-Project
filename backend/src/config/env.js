import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY
};
