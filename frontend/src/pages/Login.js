import "../styles/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("currentStudent", JSON.stringify(data.student));
        alert("Login successful");
        navigate("/dashboard");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend not connected. Please run Flask server.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={loginCard}>
        <div style={iconBox}>🔐</div>

        <h1 style={titleStyle}>Student Login</h1>

        <p style={subTitle}>
          Login to access your private dashboard, learning progress,
          resume analysis, interview practice, and certificate.
        </p>

        <input
          type="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>

        <div style={{ marginTop: "18px", fontSize: "16px" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
          <br />
          New student? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "80px",
  background:
    "linear-gradient(rgba(15,23,42,0.80), rgba(30,58,138,0.80)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const loginCard = {
  width: "520px",
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "50px",
  borderRadius: "28px",
  textAlign: "center",
  color: "black",
  boxShadow: "0 0 35px rgba(0,0,0,0.45)"
};

const iconBox = {
  fontSize: "60px",
  marginBottom: "10px"
};

const titleStyle = {
  fontSize: "42px",
  marginBottom: "12px"
};

const subTitle = {
  fontSize: "18px",
  color: "#475569",
  lineHeight: "1.6",
  marginBottom: "30px"
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "18px",
  fontSize: "18px",
  borderRadius: "12px",
  border: "1px solid #94a3b8"
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  fontSize: "20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;