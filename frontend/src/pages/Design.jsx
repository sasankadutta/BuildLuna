import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

function Design() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt to generate the design.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error
    setImageUrl(""); // Clear old image if any

    try {
      // Make request to the backend to generate design
      const response = await fetch("http://localhost:5000/api/homegpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate design. Please try again.");
      }

      const data = await response.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl); // Expecting { imageUrl: "https://..." }
      } else {
        setError("No image generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900"
      }`}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-2xl"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-3xl font-bold mb-4">Design Generator</h1>

      <div
        className={`p-6 rounded-2xl shadow-lg w-full max-w-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <input
          type="text"
          placeholder="Describe your dream home..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={`w-full p-4 border rounded-xl mb-4 focus:outline-none ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "border-gray-300"
          }`}
        />
        <button
          onClick={handleGenerate}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Design"}
        </button>
      </div>

      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}

      {/* Show loading shimmer or image */}
      {loading && (
        <div className="mt-10 animate-pulse">
          <div className="w-[300px] h-[300px] bg-gray-400 rounded-2xl"></div>
        </div>
      )}

      {imageUrl && (
        <div
          className={`mt-10 p-6 rounded-2xl shadow-lg w-full max-w-2xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-500">
            Generated Design ✨
          </h2>
          <img
            src={imageUrl}
            alt="Generated Home Design"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default Design;
