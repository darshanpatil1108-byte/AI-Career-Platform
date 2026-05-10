import { useState } from "react";

function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestion = async () => {
    if (question.trim() === "") {
      alert("Enter question");
      return;
    }

    const student = JSON.parse(localStorage.getItem("currentStudent"));

    if (!student) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question
        })
      });

      const data = await response.json();
      setAnswer(data.answer);

      const progressResponse = await fetch(
        `http://127.0.0.1:5000/get-progress/${student.email}`
      );

      const progressData = await progressResponse.json();

      let current = Number(progressData.interview) || 0;

      if (current < 100) {
        current = current + 20;

        if (current > 100) {
          current = 100;
        }

        await fetch("http://127.0.0.1:5000/update-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: student.email,
            field: "interview",
            value: current
          })
        });

        localStorage.setItem(`interviewProgress_${student.email}`, current);
      }
    } catch (error) {
      setAnswer("Backend error. Please run Flask server.");
    }

    setLoading(false);
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🤖 AI Interview Answer Generator</h1>

        <p style={subTitle}>
          Ask any interview question and get AI-powered beginner-friendly
          answers.
        </p>

        <input
          type="text"
          placeholder="Ask any interview question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={inputStyle}
        />

        <br />
        <br />

        <button onClick={handleQuestion} style={buttonStyle}>
          {loading ? "Generating..." : "Get Answer"}
        </button>

        {answer && (
          <div style={answerBox}>
            <h2>Answer:</h2>
            <p style={{ fontSize: "20px", lineHeight: "1.6" }}>{answer}</p>
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
    "linear-gradient(rgba(15,23,42,0.75), rgba(88,28,135,0.75)), url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const cardStyle = {
  width: "950px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.95)",
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
  padding: "16px",
  width: "700px",
  fontSize: "20px",
  borderRadius: "12px",
  border: "1px solid #94a3b8"
};

const buttonStyle = {
  padding: "15px 35px",
  fontSize: "20px",
  backgroundColor: "#7c3aed",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

const answerBox = {
  margin: "35px auto",
  width: "780px",
  backgroundColor: "#f8fafc",
  padding: "30px",
  borderRadius: "18px",
  color: "black",
  textAlign: "left",
  boxShadow: "0 0 12px rgba(0,0,0,0.15)"
};

export default Interview;