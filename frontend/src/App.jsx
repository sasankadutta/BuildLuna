// frontend/src/App.jsx
import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  // Function to generate design from the backend
  const generateDesign = async () => {
    if (!prompt.trim()) {
      alert("Please enter a design prompt.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate design. Please try again.");
      }

      const data = await response.json();
      setResult(data.result); // Save the result from the backend
    } catch (error) {
      console.error("Error generating design:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          HomeGPT Design Generator
        </h1>
        <input
          type="text"
          placeholder="Enter design prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={generateDesign}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Generate Design
        </button>
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Generated Result:
            </h2>
            <p className="text-gray-600">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
