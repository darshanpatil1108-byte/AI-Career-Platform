import { useState } from "react";

function CareerRoadmap() {
  const [career, setCareer] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const generateRoadmap = async () => {
    if (career.trim() === "") {
      alert("Enter career name");
      return;
    }

    const student = JSON.parse(localStorage.getItem("currentStudent"));

    if (!student) {
      alert("Please login first");
      return;
    }

    const topic = career.trim();

    const generatedRoadmap = [
      `Learn fundamentals of ${topic}`,
      `Understand important concepts and tools of ${topic}`,
      `Practice beginner-level tasks daily`,
      `Build 2 mini projects related to ${topic}`,
      `Learn advanced topics and real-world usage`,
      `Create one major project using ${topic}`,
      `Add projects to GitHub and resume`,
      `Prepare interview questions based on ${topic}`
    ];

    setRoadmap(generatedRoadmap);

    try {
      const progressResponse = await fetch(
        `https://ai-career-platform-murj.onrender.com/get-progress/${student.email}`
      );

      const progressData = await progressResponse.json();

      let current = Number(progressData.roadmap) || 0;

      if (current < 100) {
        current = current + 25;

        if (current > 100) {
          current = 100;
        }

        await fetch("https://ai-career-platform-murj.onrender.com/update-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: student.email,
            field: "roadmap",
            value: current
          })
        });

        localStorage.setItem(`roadmapProgress_${student.email}`, current);
      }
    } catch (error) {
      console.log("Roadmap progress update failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={mainCard}>
        <h1 style={titleStyle}>🗺️ AI Career Roadmap Generator</h1>

        <p style={subTitle}>
          Enter any career or technology and get a clear step-by-step roadmap.
        </p>

        <input
          type="text"
          placeholder="Example: Java Developer, Full Stack, Data Analyst..."
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          style={inputStyle}
        />

        <br />
        <br />

        <button onClick={generateRoadmap} style={buttonStyle}>
          Generate Roadmap
        </button>

        {roadmap.length > 0 && (
          <div style={roadmapBox}>
            {roadmap.map((step, index) => (
              <div key={index} style={stepCard}>
                <div style={stepNumber}>{index + 1}</div>

                <h3 style={stepText}>{step}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "70px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(21,128,61,0.78)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const mainCard = {
  width: "1000px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "50px",
  borderRadius: "30px",
  textAlign: "center",
  color: "#0f172a",
  boxShadow: "0 0 35px rgba(0,0,0,0.35)"
};

const titleStyle = {
  fontSize: "48px",
  color: "#166534",
  marginBottom: "12px"
};

const subTitle = {
  fontSize: "20px",
  color: "#475569",
  marginBottom: "30px"
};

const inputStyle = {
  padding: "16px",
  width: "700px",
  fontSize: "20px",
  borderRadius: "12px",
  border: "1px solid #94a3b8",
  color: "#0f172a",
  backgroundColor: "white"
};

const buttonStyle = {
  padding: "15px 35px",
  fontSize: "20px",
  background: "linear-gradient(135deg,#16a34a,#2563eb)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

const roadmapBox = {
  marginTop: "40px",
  display: "grid",
  gap: "18px"
};

const stepCard = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  background: "linear-gradient(135deg,#ffffff,#ecfdf5)",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  borderLeft: "7px solid #16a34a",
  textAlign: "left"
};

const stepNumber = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "#16a34a",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px"
};

const stepText = {
  color: "#0f172a",
  margin: 0
};

export default CareerRoadmap;