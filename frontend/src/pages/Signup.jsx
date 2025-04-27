import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup({ updateLoginStatus }) {
  // Pass updateLoginStatus as a prop
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Added state for username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate(); // navigate hook for redirection

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true); // Show loading state

    try {
      // Make a POST request to the backend API to sign up the user
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful signup, store user data in localStorage
        localStorage.setItem("buildlunaLoggedIn", "true");
        localStorage.setItem("authToken", data.token); // Store JWT token
        localStorage.setItem("username", username); // Store username

        // Update the login status in App.js
        updateLoginStatus();

        // Debugging: Log the backend response to check data
        console.log("Signup successful, backend response:", data);

        // Redirect to the design page after successful signup
        navigate("/design"); // Ensure it navigates to the design page
      } else {
        // Show error if signup fails
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      // Handle any errors during the fetch request
      console.error("Error during signup:", error);
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
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Added username input
          className="w-full p-4 border rounded-xl mb-4 focus:outline-none"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4 focus:outline-none"
        />
        <button
          onClick={handleSignup}
          disabled={loading} // Disable button while submitting
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
