import { useContext, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa"; // Import icons

function Home() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get the username from localStorage
  const username = localStorage.getItem("username");

  const handleLaunchLuna = () => {
    const isLoggedIn = localStorage.getItem("buildlunaLoggedIn") === "true";

    if (isLoggedIn) {
      navigate("/design");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    // Clear localStorage and log the user out
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-between p-4 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")} // Navigate to homepage on click
        >
          BuildLuna
        </div>
        {localStorage.getItem("buildlunaLoggedIn") === "true" && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 mr-2">
                {/* Display profile icon or username */}
                {username ? username[0].toUpperCase() : "U"}
              </div>
              <span className="text-sm">{username}</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-md w-40 p-2">
                <div
                  className="flex items-center p-2 cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <MdOutlineLightMode className="mr-2" />
                  ) : (
                    <MdDarkMode className="mr-2" />
                  )}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Background Blur Lights */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Background House Logo */}
      <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <img
          src="/House3d.png"
          alt="3D House Logo"
          className="w-[650px] md:w-[1920px] opacity-30 max-w-full"
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BuildLuna 🏡
        </motion.h1>
        <motion.p
          className={`text-lg md:text-2xl mb-8 text-center max-w-2xl ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Turn your ideas into beautiful home designs with AI. <br></br>Just one
          prompt can turn your imagination into your future.
        </motion.p>

        {/* Launch Platform Button */}
        <motion.button
          onClick={handleLaunchLuna}
          aria-label="Launch Design Platform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all"
        >
          Launch Luna 🚀
        </motion.button>
      </div>

      {/* Bottom content (Buildluna v1.0.0 & social media icons) */}
      <div className="absolute bottom-4 left-4 flex justify-between w-full px-6">
        {/* Left side - Buildluna version */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>BuildLuna v1.0.0</span>
        </div>

        {/* Right side - Social media icons */}
        <div className="flex gap-6 mr-4">
          <a
            href="mailto:support@buildluna.com"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
