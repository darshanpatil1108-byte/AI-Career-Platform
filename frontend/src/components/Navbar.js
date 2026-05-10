import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ darkMode, toggleDarkMode }) {
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("currentStudent"));

  const logout = () => {
    localStorage.removeItem("currentStudent");

    alert("Logout successful");

    navigate("/login");

    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <h1 className="logo">
          🚀 AI Career Platform
        </h1>

        <div className="middle-links">
          <Link to="/">🏠 Home</Link>

          {student && (
            <>
              <Link to="/dashboard">📊 Dashboard</Link>

              <Link to="/resume">📄 Resume</Link>

              <Link to="/interview">🤖 Interview</Link>

              <Link to="/roadmap">🗺️ Roadmap</Link>

              <Link to="/learning">📚 Learning</Link>

              <Link to="/certificate">🏆 Certificate</Link>

              <Link to="/leaderboard">🥇 Leaderboard</Link>

              <Link to="/placement">📈 Analytics</Link>

              <Link to="/admin">🛡️ Admin</Link>
            </>
          )}
        </div>
      </div>

      <div className="right-section">
        {!student && (
          <>
            <Link
              to="/login"
              className="login-btn"
            >
              🔑 Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
            >
              ➕ Register
            </Link>
          </>
        )}

        {student && (
          <Link
            to="/profile"
            className="profile-circle"
          >
            👤
          </Link>
        )}

        <button
          className="settings-circle"
          onClick={() =>
            setShowSettings(!showSettings)
          }
        >
          ⚙️
        </button>

        {showSettings && (
          <div className="settings-dropdown">
            {student ? (
              <>
                <Link to="/profile">
                  👤 Profile
                </Link>

                <Link to="/dashboard">
                  📊 Dashboard
                </Link>

                <Link to="/learning">
                  📚 My Learning
                </Link>

                <Link to="/resume">
                  📄 Resume ATS
                </Link>

                <Link to="/interview">
                  🤖 Interview
                </Link>

                <Link to="/roadmap">
                  🗺️ Roadmap
                </Link>

                <Link to="/certificate">
                  🏆 Certificate
                </Link>

                <Link to="/leaderboard">
                  🥇 Leaderboard
                </Link>

                <Link to="/placement">
                  📈 Analytics
                </Link>

                <Link to="/admin">
                  🛡️ Admin
                </Link>

                <button onClick={toggleDarkMode}>
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </button>

                <button onClick={logout}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  🔑 Login
                </Link>

                <Link to="/register">
                  ➕ Register
                </Link>

                <button onClick={toggleDarkMode}>
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;