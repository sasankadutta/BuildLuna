import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Design from "./pages/Design";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for login status on page load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("buildlunaLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Set login status based on the localStorage value after signup or login
  const updateLoginStatus = () => {
    const loggedInStatus = localStorage.getItem("buildlunaLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} /> {/* Pass login state to Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/design"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Design />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login updateLoginStatus={updateLoginStatus} />}
          />
          <Route
            path="/signup"
            element={<Signup updateLoginStatus={updateLoginStatus} />}
          />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
