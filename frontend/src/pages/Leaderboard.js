import { useEffect, useState } from "react";

function Leaderboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/leaderboard")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(() => console.log("Backend not connected"));
  }, []);

  return (
    <div style={pageStyle}>
      <div style={mainCard}>
        <h1 style={titleStyle}>🏆 Student Leaderboard</h1>

        <p style={subTitle}>
          Ranking students based on total learning, resume, interview, and roadmap progress.
        </p>

        {students.map((student, index) => (
          <div key={index} style={rankCard}>
            <div style={rankBadge}>
              #{index + 1}
            </div>

            <div>
              <h2 style={nameStyle}>{student.name}</h2>
              <p style={emailStyle}>{student.email}</p>
            </div>

            <div style={progressSection}>
              <h3 style={progressText}>{student.total}%</h3>

              <div style={progressBg}>
                <div
                  style={{
                    ...progressFill,
                    width: `${student.total}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "70px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(30,58,138,0.78)), url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const mainCard = {
  width: "950px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "45px",
  borderRadius: "30px",
  boxShadow: "0 0 35px rgba(0,0,0,0.35)",
  color: "#0f172a"
};

const titleStyle = {
  textAlign: "center",
  fontSize: "48px",
  color: "#1e3a8a",
  marginBottom: "10px"
};

const subTitle = {
  textAlign: "center",
  fontSize: "18px",
  color: "#475569",
  marginBottom: "35px"
};

const rankCard = {
  display: "grid",
  gridTemplateColumns: "90px 1fr 260px",
  alignItems: "center",
  gap: "20px",
  background: "linear-gradient(135deg,#ffffff,#eff6ff)",
  padding: "25px",
  borderRadius: "22px",
  marginBottom: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  borderLeft: "8px solid #2563eb"
};

const rankBadge = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "bold"
};

const nameStyle = {
  margin: 0,
  fontSize: "26px",
  color: "#0f172a"
};

const emailStyle = {
  margin: "8px 0 0",
  color: "#475569",
  fontSize: "16px"
};

const progressSection = {
  textAlign: "center"
};

const progressText = {
  color: "#2563eb",
  fontSize: "28px",
  margin: "0 0 10px"
};

const progressBg = {
  width: "100%",
  height: "14px",
  backgroundColor: "#dbeafe",
  borderRadius: "20px",
  overflow: "hidden"
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg,#2563eb,#06b6d4,#7c3aed)",
  borderRadius: "20px"
};

export default Leaderboard;