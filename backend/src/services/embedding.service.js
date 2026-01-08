import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization - genAI will be created when first needed (after dotenv.config() has run)
let genAI = null;

function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured. Please set it in your .env file.");
  }
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  
  return genAI;
}

export async function generateEmbedding(text) {
  try {
    const client = getGenAI();
    const model = client.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values;
  } catch (error) {
    if (error.message && error.message.includes("GEMINI_API_KEY is not configured")) {
      throw error;
    }
    
    if (error.status === 400 && error.errorDetails) {
      const apiKeyError = error.errorDetails.find(
        detail => detail.reason === "API_KEY_INVALID"
      );
      if (apiKeyError) {
        throw new Error("Invalid GEMINI_API_KEY. Please check your API key in the .env file and ensure it's valid.");
      }
    }
    
    if (error.status === 404) {
      throw new Error(`Embedding model not found: ${error.message}. Please check if the model name is correct.`);
    }
    
    throw error;
  }
}