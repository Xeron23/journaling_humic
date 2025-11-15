import { GoogleGenAI } from "@google/genai";

const geminiAi = new GoogleGenAI({
    apiKey: process.env.API_KEY_GEMINI,
});

export default geminiAi;