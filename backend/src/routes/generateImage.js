// server/routes/generateImage.js

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Store your API Key in .env

router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" }); // vision model
    const result = await model.generateContent(prompt);

    const imageUrl = result.response.text(); // Sometimes comes as URL or base64 based on settings

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;
