import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { MdAccountCircle, MdLogout } from "react-icons/md"; // Import profile and logout icons

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [username, setUsername] = useState("Guest"); // Default username

  useEffect(() => {
    // Check login status and username from localStorage on component mount
    const loggedInStatus = localStorage.getItem("buildlunaLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || "Guest");
    }
  }, [location]);

  const handleLogout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem("buildlunaLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    setIsLoggedIn(false); // Update login state

    // Redirect to homepage after logout
    navigate("/");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 shadow-md flex items-center justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left Side: Logo */}
      <Link to="/" className="text-2xl font-bold">
        BuildLuna 🏡
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Pricing Link always visible */}
        <Link
          to="/pricing"
          className="font-semibold hover:text-purple-500 transition-all"
        >
          Pricing
        </Link>

        {isLoggedIn ? (
          <>
            {/* Show Profile and Dropdown on all pages */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-2xl flex items-center gap-2 focus:outline-none"
                aria-label="Profile"
              >
                <MdAccountCircle />
                <span className="text-sm font-semibold">{username}</span>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className={`absolute top-12 right-0 p-4 w-48 bg-white rounded-lg shadow-md z-10 ${
                    darkMode
                      ? "text-white bg-gray-800"
                      : "text-gray-900 bg-white"
                  }`}
                >
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full text-left mb-4 hover:bg-gray-200 py-2 px-4 rounded-md ${
                      darkMode ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                  </button>

                  {/* Center-align Logout button with an icon */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:bg-gray-200 py-2 px-4 rounded-md flex items-center justify-center gap-2"
                  >
                    <MdLogout /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Show Login on Home page */}
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full font-semibold transition-all"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
