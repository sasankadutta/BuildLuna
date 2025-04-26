// backend/homegpt.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export const generateDesign = async (prompt) => {
  const response = await fetch("/api/generate-design", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data; // Assuming 'data' includes an 'imageUrl' field.
};

// API route to interact with OpenAI
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
