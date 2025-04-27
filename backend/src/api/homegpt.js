import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route to generate content (text or image) based on prompt
app.post("/api/homegpt", async (req, res) => {
  const { prompt } = req.body; // The prompt sent by the frontend

  try {
    // Initialize the model to use Gemini's generative capabilities
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Send the prompt to Gemini and get the result
    const result = await model.generateContent(prompt);

    // Get the response text (it may include the generated design or description)
    const responseText = result.response.text();

    // Get the image URL if available from the Gemini response
    const imageUrl = result.response.image ? result.response.image.url : null;

    // Return both text and image data in the response
    res.json({ result: responseText, imageUrl: imageUrl });
  } catch (error) {
    console.error("Error while generating with Gemini:", error); // Log the error for debugging

    // Send a 500 response back to the frontend with a message
    res.status(500).json({
      error: error.message || "Failed to generate design. Please try again.",
    });
  }
});

// Set the port to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
