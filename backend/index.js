import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini
import authRoutes from "./src/routes/authRoutes.js"; // Update path as needed
import connectDB from "./src/config/db.js"; // MongoDB connection

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the /generate route to handle image generation requests
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  // Check if prompt is provided and valid
  if (!prompt || prompt.trim() === "") {
    return res
      .status(400)
      .json({ message: "Prompt is required for image generation." });
  }

  try {
    // Create the Gemini generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate content using the model and the user's prompt
    const result = await model.generateContent(prompt);

    // Process the response to get the generated design/content
    const response = await result.response; // Assuming the response has the content we need
    const text = await response.text(); // This is for text generation. For images, the approach will differ.

    // Assuming the response contains the generated image URL or content
    const imageUrl = text; // If it's an image, we expect an image URL as a response
    if (imageUrl) {
      return res.json({ imageUrl }); // Send the generated image URL back to the frontend
    } else {
      return res
        .status(500)
        .json({ message: "Failed to generate design from Gemini." });
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return res
      .status(500)
      .json({ message: "Error generating image from backend." });
  }
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Mount the auth routes after DB connection
    app.use("/api/auth", authRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
