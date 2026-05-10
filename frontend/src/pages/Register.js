import "../styles/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [student, setStudent] = useState({
    name: "",
    registerNumber: "",
    mobile: "",
    email: "",
    password: "",
    area: "",
    city: "",
    pincode: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (
      student.name === "" ||
      student.registerNumber === "" ||
      student.mobile === "" ||
      student.email === "" ||
      student.password === "" ||
      student.area === "" ||
      student.city === "" ||
      student.pincode === ""
    ) {
      alert("Please fill all student details");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend not connected. Please run Flask server.");
    }
  };

  return (
    <div className="register-container">
      <h1>Create Student Account</h1>

      <input name="name" type="text" placeholder="Enter Name" onChange={handleChange} />
      <input name="registerNumber" type="text" placeholder="Enter Register Number" onChange={handleChange} />
      <input name="mobile" type="text" placeholder="Enter Mobile Number" onChange={handleChange} />
      <input name="email" type="email" placeholder="Enter Email Address" onChange={handleChange} />
      <input name="password" type="password" placeholder="Create Password" onChange={handleChange} />
      <input name="area" type="text" placeholder="Enter Area" onChange={handleChange} />
      <input name="city" type="text" placeholder="Enter City" onChange={handleChange} />
      <input name="pincode" type="text" placeholder="Enter Pincode" onChange={handleChange} />

      <button onClick={handleRegister}>Create Account</button>
    </div>
  );
}

export default Register;