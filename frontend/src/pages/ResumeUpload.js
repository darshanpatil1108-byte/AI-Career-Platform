import { useState } from "react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload resume first");
      return;
    }

    const student = JSON.parse(localStorage.getItem("currentStudent"));

    if (!student) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("https://ai-career-platform-murj.onrender.com/analyze-resume", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResult(data);

      await fetch("https://ai-career-platform-murj.onrender.com/update-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: student.email,
          field: "resume",
          value: 100
        })
      });

      localStorage.setItem(`resumeProgress_${student.email}`, 100);
    } catch (error) {
      setResult({
        score: 0,
        missing_keywords: ["Backend connection failed"],
        grammar_issues: ["Please run Flask backend server."],
        suggestion: "Start backend using py app.py and try again."
      });
    }

    setLoading(false);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>📄 ATS Resume Analyzer</h1>

        <p style={subTitle}>
          Upload your resume to detect ATS score, missing keywords, grammar
          mistakes, formatting issues, and improvement suggestions.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
        />

        <br />
        <br />

        <button onClick={analyzeResume} style={buttonStyle}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div style={resultBox}>
            <h2 style={{ color: "#2563eb" }}>ATS Score: {result.score}%</h2>

            <div style={sectionBox}>
              <h3>❌ Missing Keywords</h3>

              <ul>
                {result.missing_keywords.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={sectionBox}>
              <h3>📝 Grammar / Writing Mistakes</h3>

              <ul>
                {result.grammar_issues.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={sectionBox}>
              <h3>✅ Proper Improvement Suggestion</h3>

              <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
                {result.suggestion}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "80px",
  background:
    "linear-gradient(rgba(15,23,42,0.75), rgba(30,58,138,0.75)), url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const cardStyle = {
  width: "950px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.96)",
  padding: "55px",
  borderRadius: "25px",
  textAlign: "center",
  color: "black",
  boxShadow: "0 0 25px rgba(0,0,0,0.35)"
};

const titleStyle = {
  fontSize: "48px",
  marginBottom: "15px"
};

const subTitle = {
  fontSize: "20px",
  color: "#475569",
  marginBottom: "30px"
};

const inputStyle = {
  fontSize: "18px",
  padding: "16px",
  border: "2px dashed #2563eb",
  borderRadius: "12px",
  backgroundColor: "#f8fafc",
  width: "550px"
};

const buttonStyle = {
  padding: "15px 35px",
  fontSize: "20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

const resultBox = {
  width: "800px",
  margin: "35px auto",
  padding: "30px",
  backgroundColor: "#f8fafc",
  borderRadius: "18px",
  textAlign: "left",
  boxShadow: "0 0 12px rgba(0,0,0,0.15)"
};

const sectionBox = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "14px",
  marginTop: "20px",
  borderLeft: "6px solid #2563eb"
};

export default ResumeUpload;