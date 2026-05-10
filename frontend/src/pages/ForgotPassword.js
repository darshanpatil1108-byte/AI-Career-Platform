import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const resetPassword = () => {
    if (email === "" || newPassword === "") {
      alert("Please enter email and new password");
      return;
    }

    const student = JSON.parse(localStorage.getItem(`student_${email}`));

    if (!student) {
      alert("Account not found");
      return;
    }

    student.password = newPassword;

    localStorage.setItem(`student_${email}`, JSON.stringify(student));

    alert("Password updated successfully. Please login.");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Registered Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "12px",
          width: "350px",
          fontSize: "16px",
          marginBottom: "12px"
        }}
      />

      <br />

      <input
        type="password"
        placeholder="Enter New Password"
        onChange={(e) => setNewPassword(e.target.value)}
        style={{
          padding: "12px",
          width: "350px",
          fontSize: "16px"
        }}
      />

      <br />
      <br />

      <button
        onClick={resetPassword}
        style={{
          padding: "12px 25px",
          fontSize: "18px"
        }}
      >
        Update Password
      </button>
    </div>
  );
}

export default ForgotPassword;