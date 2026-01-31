import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey });

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    // Extract base64 encoded image string
    const base64EncodeString = response.generatedImages?.[0]?.image?.imageBytes;

    if (!base64EncodeString) {
      throw new Error("No image data received from the model.");
    }

    return `data:image/jpeg;base64,${base64EncodeString}`;
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};