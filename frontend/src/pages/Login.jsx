import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login({ updateLoginStatus }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true); // Start loading state

    try {
      // Make a POST request to the backend API to log in the user
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token and username in localStorage
        localStorage.setItem("buildlunaLoggedIn", "true");
        localStorage.setItem("authToken", data.token); // Store JWT token
        localStorage.setItem("username", data.user.username); // Store username in localStorage

        // Update the login status in App.js
        updateLoginStatus(true); // Pass `true` to indicate successful login

        // Redirect to the design page after successful login
        navigate("/design");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4 focus:outline-none"
        />
        <button
          onClick={handleLogin}
          disabled={loading} // Disable button while submitting
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-500 font-semibold">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
