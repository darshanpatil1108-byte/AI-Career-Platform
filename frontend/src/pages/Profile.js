import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const savedStudent = JSON.parse(localStorage.getItem("currentStudent"));

  const [student, setStudent] = useState(savedStudent);
  const [editMode, setEditMode] = useState(false);

  if (!student) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>No student logged in</h1>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = () => {
    localStorage.setItem("currentStudent", JSON.stringify(student));
    localStorage.setItem(`student_${student.email}`, JSON.stringify(student));
    alert("Profile updated successfully");
    setEditMode(false);
  };

  const logout = () => {
    localStorage.removeItem("currentStudent");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <div style={pageStyle}>
      <div style={profileCard}>
        <div style={headerStyle}>
          <div style={avatarStyle}>
            {student.name ? student.name.charAt(0).toUpperCase() : "S"}
          </div>

          <div>
            <h1 style={{ margin: 0 }}>Student Profile</h1>
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Web Development Intern
            </p>
          </div>
        </div>

        {editMode ? (
          <div style={formGrid}>
            <input style={inputStyle} name="name" value={student.name} onChange={handleChange} placeholder="Name" />
            <input style={inputStyle} name="registerNumber" value={student.registerNumber} onChange={handleChange} placeholder="Register Number" />
            <input style={inputStyle} name="mobile" value={student.mobile} onChange={handleChange} placeholder="Mobile Number" />
            <input style={inputStyle} name="email" value={student.email} onChange={handleChange} placeholder="Email" />
            <input style={inputStyle} name="area" value={student.area} onChange={handleChange} placeholder="Area" />
            <input style={inputStyle} name="city" value={student.city} onChange={handleChange} placeholder="City" />
            <input style={inputStyle} name="pincode" value={student.pincode} onChange={handleChange} placeholder="Pincode" />

            <button style={saveBtn} onClick={saveProfile}>
              ✅ Save Changes
            </button>
          </div>
        ) : (
          <>
            <div style={detailsGrid}>
              <InfoCard icon="👨‍🎓" title="Name" value={student.name} />
              <InfoCard icon="🆔" title="Register Number" value={student.registerNumber} />
              <InfoCard icon="📱" title="Mobile Number" value={student.mobile} />
              <InfoCard icon="📧" title="Email Address" value={student.email} />
              <InfoCard icon="📍" title="Area" value={student.area} />
              <InfoCard icon="🏙️" title="City" value={student.city} />
              <InfoCard icon="📮" title="Pincode" value={student.pincode} />
              <InfoCard icon="💼" title="Role" value="Web Development Intern" />
            </div>

            <div style={buttonRow}>
              <button style={editBtn} onClick={() => setEditMode(true)}>
                ✏️ Edit Profile
              </button>

              <button style={logoutBtn} onClick={logout}>
                🚪 Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div style={infoCard}>
      <div style={infoIcon}>{icon}</div>
      <div>
        <p style={infoTitle}>{title}</p>
        <h3 style={infoValue}>{value}</h3>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dbeafe, #f5f3ff)",
  padding: "60px"
};

const profileCard = {
  width: "950px",
  margin: "0 auto",
  backgroundColor: "white",
  borderRadius: "25px",
  padding: "40px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  color: "#111827"
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "25px",
  marginBottom: "35px",
  borderBottom: "2px solid #e5e7eb",
  paddingBottom: "25px"
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "45px",
  fontWeight: "bold"
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "22px"
};

const infoCard = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  backgroundColor: "#f8fafc",
  padding: "22px",
  borderRadius: "16px",
  borderLeft: "6px solid #2563eb"
};

const infoIcon = {
  fontSize: "34px"
};

const infoTitle = {
  margin: 0,
  color: "#64748b",
  fontSize: "15px"
};

const infoValue = {
  margin: "6px 0 0",
  fontSize: "21px",
  color: "#0f172a"
};

const buttonRow = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "35px"
};

const editBtn = {
  padding: "14px 30px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer"
};

const logoutBtn = {
  padding: "14px 30px",
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px"
};

const inputStyle = {
  padding: "14px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1"
};

const saveBtn = {
  gridColumn: "1 / 3",
  padding: "14px",
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Profile;