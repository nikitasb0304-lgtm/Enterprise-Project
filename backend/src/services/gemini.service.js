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

// Helper function to list available models by calling the REST API
export async function listAvailableModels() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const models = data.models || [];
    
    // Filter for models that support generateContent
    const textModels = models
      .filter(model => {
        const methods = model.supportedGenerationMethods || [];
        return methods.includes('generateContent');
      })
      .map(model => model.name.replace('models/', ''));

    return textModels;
  } catch (error) {
    console.error("Error listing models:", error);
    // Fallback to common model names if API call fails
    return ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
  }
}

export async function askGemini(prompt) {
  // First, try to get the list of available models
  let modelNames;
  try {
    modelNames = await listAvailableModels();
    console.log("Available models:", modelNames);
  } catch (error) {
    console.warn("Could not fetch available models, using fallback list:", error.message);
    // Fallback to common model names
    modelNames = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash"];
  }
  
  if (modelNames.length === 0) {
    throw new Error("No available models found. Please check your API key permissions.");
  }
  
  for (const modelName of modelNames) {
    try {
      const client = getGenAI();
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(`Successfully used model: ${modelName}`);
      return response.text();
    } catch (error) {
      // If it's a 404 and not the last model, try the next one
      if (error.status === 404 && modelName !== modelNames[modelNames.length - 1]) {
        console.warn(`Model ${modelName} not available, trying next model...`);
        continue;
      }
      
      // For other errors or if this is the last model, throw the error
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
        throw new Error(`None of the available models (${modelNames.join(", ")}) are accessible. ${error.message}. This might indicate an API key permission issue. Please ensure your API key has access to Generative Language API models.`);
      }
      
      throw error;
    }
  }
}
