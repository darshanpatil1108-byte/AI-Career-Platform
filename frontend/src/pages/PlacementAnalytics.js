import { useEffect, useState } from "react";

function PlacementAnalytics() {
  const [data, setData] = useState({
    total_students: 0,
    placement_ready: 0,
    average_progress: 0
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/placement-analytics")
      .then((res) => res.json())
      .then((result) => {
        setData({
          total_students: result.total_students || 0,
          placement_ready: result.placement_ready || 0,
          average_progress: result.average_progress || 0
        });
      })
      .catch(() => {
        console.log("Backend not connected");
      });
  }, []);

  return (
    <div style={pageStyle}>
      <div style={mainCard}>
        <h1 style={titleStyle}>📈 Placement Analytics</h1>

        <p style={subTitle}>
          Track student readiness, platform progress, and placement eligibility.
        </p>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={iconStyle}>👨‍🎓</div>
            <h2>Total Students</h2>
            <h1 style={numberStyle}>{data.total_students}</h1>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>🚀</div>
            <h2>Placement Ready</h2>
            <h1 style={numberStyle}>{data.placement_ready}</h1>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📊</div>
            <h2>Average Progress</h2>
            <h1 style={numberStyle}>
              {Math.round(data.average_progress)}%
            </h1>
          </div>
        </div>

        <div style={infoBox}>
          <h2>✅ Placement Readiness Rule</h2>
          <p>
            Students are considered placement ready when their overall progress
            reaches 90% or above.
          </p>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "70px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(30,58,138,0.78)), url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const mainCard = {
  width: "1150px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "45px",
  borderRadius: "30px",
  boxShadow: "0 0 35px rgba(0,0,0,0.35)",
  textAlign: "center",
  color: "#0f172a"
};

const titleStyle = {
  fontSize: "52px",
  marginBottom: "10px",
  color: "#1e3a8a"
};

const subTitle = {
  fontSize: "20px",
  color: "#475569",
  marginBottom: "40px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "28px"
};

const cardStyle = {
  background: "linear-gradient(135deg,#ffffff,#eff6ff)",
  padding: "40px",
  borderRadius: "25px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
  borderTop: "7px solid #2563eb"
};

const iconStyle = {
  fontSize: "48px",
  marginBottom: "12px"
};

const numberStyle = {
  fontSize: "46px",
  color: "#2563eb"
};

const infoBox = {
  marginTop: "35px",
  backgroundColor: "#f8fafc",
  padding: "25px",
  borderRadius: "20px",
  borderLeft: "8px solid #16a34a",
  textAlign: "left",
  fontSize: "18px"
};

export default PlacementAnalytics;