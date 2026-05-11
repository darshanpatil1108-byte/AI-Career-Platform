import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function Dashboard() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));

  const [data, setData] = useState({
    learning: 0,
    resume: 0,
    interview: 0,
    roadmap: 0
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!student) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/get-progress/${student.email}`
        );

        const progress = await response.json();

        setData({
          learning: Number(progress.learning) || 0,
          resume: Number(progress.resume) || 0,
          interview: Number(progress.interview) || 0,
          roadmap: Number(progress.roadmap) || 0
        });
      } catch (error) {
        console.log("Progress backend not connected");
      }
    };

    fetchProgress();

    const interval = setInterval(fetchProgress, 2000);

    return () => clearInterval(interval);
  }, [student]);

  const dashboardData = [
    { name: "Learning", level: data.learning },
    { name: "Resume ATS", level: data.resume },
    { name: "Interview", level: data.interview },
    { name: "Roadmap", level: data.roadmap }
  ];

  const totalProgress = Math.round(
    (data.learning + data.resume + data.interview + data.roadmap) / 4
  );

  return (
    <div style={pageStyle}>
      <div style={headerCard}>
        <h1 style={titleStyle}>
          📊 Welcome, {student ? student.name : "Student"}
        </h1>

        <p style={subTitle}>
          Track your learning, resume, interview, and career roadmap progress.
        </p>

        <div style={overallBox}>
          <h2>Overall Progress: {totalProgress}%</h2>

          <div style={overallBg}>
            <div style={{ ...overallFill, width: `${totalProgress}%` }}>
              {totalProgress}%
            </div>
          </div>
        </div>
      </div>

      <div style={gridStyle}>
        {dashboardData.map((item, index) => (
          <div key={index} style={cardStyle}>
            <h2>{item.name}</h2>

            <h1 style={{ color: "#2563eb" }}>{item.level}%</h1>

            <div style={progressBg}>
              <div
                style={{
                  ...progressFill,
                  width: `${item.level}%`
                }}
              >
                {item.level}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={chartCard}>
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          📈 Progress Analytics
        </h2>

        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="level" fill="#2563eb" barSize={55} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "55px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(30,58,138,0.78)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const headerCard = {
  width: "1000px",
  margin: "0 auto 35px",
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "35px",
  borderRadius: "25px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(0,0,0,0.35)"
};

const titleStyle = {
  fontSize: "44px",
  color: "#0f172a"
};

const subTitle = {
  fontSize: "19px",
  color: "#475569"
};

const overallBox = {
  marginTop: "25px"
};

const overallBg = {
  width: "700px",
  margin: "15px auto",
  backgroundColor: "#dbeafe",
  borderRadius: "25px",
  overflow: "hidden"
};

const overallFill = {
  background: "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  padding: "14px",
  fontWeight: "bold",
  borderRadius: "25px"
};

const gridStyle = {
  width: "1100px",
  margin: "35px auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "22px"
};

const cardStyle = {
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "25px",
  borderRadius: "22px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0,0,0,0.25)"
};

const progressBg = {
  width: "100%",
  backgroundColor: "#e2e8f0",
  borderRadius: "20px",
  overflow: "hidden"
};

const progressFill = {
  background: "linear-gradient(90deg,#2563eb,#06b6d4)",
  color: "white",
  padding: "10px",
  fontWeight: "bold",
  borderRadius: "20px",
  minWidth: "35px"
};

const chartCard = {
  width: "1100px",
  margin: "35px auto",
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "35px",
  borderRadius: "25px",
  boxShadow: "0 0 25px rgba(0,0,0,0.35)"
};

export default Dashboard;