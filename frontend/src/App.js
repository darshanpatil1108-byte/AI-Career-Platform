import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ChatbotAssistant from "./components/ChatbotAssistant";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeATS from "./pages/ResumeUpload";
import Interview from "./pages/Interview";
import CareerRoadmap from "./pages/CareerRoadmap";
import LearningTracker from "./pages/LearningTracker";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Certificate from "./pages/Certificate";

import AdminDashboard from "./pages/AdminDashboard";
import Leaderboard from "./pages/Leaderboard";
import PlacementAnalytics from "./pages/PlacementAnalytics";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<ResumeATS />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/roadmap" element={<CareerRoadmap />} />

        <Route path="/learning" element={<LearningTracker />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/certificate" element={<Certificate />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/placement" element={<PlacementAnalytics />} />
      </Routes>

      <ChatbotAssistant />
    </BrowserRouter>
  );
}

export default App;