"use server"

import { GoogleGenAI } from "@google/genai"

export async function sendChatMessage(userMessage: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return "API key not configured. Please add GEMINI_API_KEY to your environment variables."
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const model = ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: "System Prompt: You are ArcFocus AI. Brief, tactical, encouraging. " + userMessage }],
        },
      ],
    })

    const result = await model
    return result.text || "NO DATA."
  } catch (e) {
    console.error("Error generating content:", e)
    return "NETWORK FAILURE."
  }
}
