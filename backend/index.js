import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai"; // Use the correct OpenAI import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI API client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

// Define the /generate route to handle design requests
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // Correct function to create a chat completion using the model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Replace 'gpt-4' with 'gpt-3.5-turbo' if you don't have access to GPT-4
      messages: [{ role: "user", content: prompt }],
    });

    // Send the result to the frontend
    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
