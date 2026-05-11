import { useEffect, useState } from "react";

function LearningTracker() {
  const [completed, setCompleted] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [videoReady, setVideoReady] = useState(false);
  const [timer, setTimer] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const student = JSON.parse(localStorage.getItem("currentStudent"));
  const studentKey = student ? student.email : "guest";

  const courses = [
    {
      subject: "HTML",
      icon: "🌐",
      color: "#e34c26",
      tasks: [
        {
          id: 1,
          type: "Video",
          title: "HTML Full Course",
          link: "https://www.youtube.com/embed/qz0aGYrrlhU"
        },
        {
          id: 2,
          type: "Notes",
          title: "HTML Notes",
          content:
            "HTML is used to create webpage structure. It uses tags like h1, p, div, form, input, table, img, and anchor tag. HTML is the skeleton of every website."
        },
        {
          id: 3,
          type: "Assignment",
          title: "Portfolio Page Assignment",
          content:
            "Create a portfolio page with your name, about section, skills, education, projects, and contact details.",
          questions: [
            {
              question: "Which tag is used to create a hyperlink?",
              options: ["<a>", "<p>", "<div>", "<table>"],
              correct: "<a>"
            },
            {
              question: "Which tag is the largest heading?",
              options: ["<h1>", "<h6>", "<p>", "<head>"],
              correct: "<h1>"
            },
            {
              question: "Which tag creates a form?",
              options: ["<form>", "<input>", "<button>", "<label>"],
              correct: "<form>"
            }
          ]
        }
      ]
    },
    {
      subject: "CSS",
      icon: "🎨",
      color: "#264de4",
      tasks: [
        {
          id: 4,
          type: "Video",
          title: "CSS Full Course",
          link: "https://www.youtube.com/embed/1Rs2ND1ryYc"
        },
        {
          id: 5,
          type: "Notes",
          title: "CSS Notes",
          content:
            "CSS is used to style webpages. It controls colors, fonts, spacing, borders, shadows, background, flexbox, grid, and responsive design."
        },
        {
          id: 6,
          type: "Assignment",
          title: "Login Page Design Assignment",
          content:
            "Create a modern login page using CSS. Add background color, styled inputs, button hover effect, border radius, and responsive layout.",
          questions: [
            {
              question: "Which CSS property changes text color?",
              options: ["color", "font-size", "margin", "padding"],
              correct: "color"
            },
            {
              question: "Which property gives background color?",
              options: ["background-color", "color", "display", "border"],
              correct: "background-color"
            },
            {
              question: "Which layout is one-dimensional?",
              options: ["flexbox", "grid", "table", "float"],
              correct: "flexbox"
            }
          ]
        }
      ]
    },
    {
      subject: "JavaScript",
      icon: "⚡",
      color: "#f59e0b",
      tasks: [
        {
          id: 7,
          type: "Video",
          title: "JavaScript Full Course",
          link: "https://www.youtube.com/embed/W6NZfCO5SIk"
        },
        {
          id: 8,
          type: "Notes",
          title: "JavaScript Notes",
          content:
            "JavaScript makes webpages interactive. It is used for events, functions, arrays, objects, DOM manipulation, loops, conditions, and API calls."
        },
        {
          id: 9,
          type: "Assignment",
          title: "Todo App Assignment",
          content:
            "Create a Todo App where users can add tasks, delete tasks, and mark tasks as completed.",
          questions: [
            {
              question: "Which method prints output in console?",
              options: ["console.log()", "print()", "echo()", "display()"],
              correct: "console.log()"
            },
            {
              question: "Which keyword declares block-scoped variable?",
              options: ["let", "var", "static", "print"],
              correct: "let"
            },
            {
              question: "Which method adds item to array?",
              options: ["push()", "pop()", "shift()", "slice()"],
              correct: "push()"
            }
          ]
        }
      ]
    },
    {
      subject: "React.js",
      icon: "⚛️",
      color: "#06b6d4",
      tasks: [
        {
          id: 10,
          type: "Video",
          title: "React Full Course",
          link: "https://www.youtube.com/embed/bMknfKXIFA8"
        },
        {
          id: 11,
          type: "Notes",
          title: "React Notes",
          content:
            "React is used to build user interfaces. Important concepts are components, JSX, props, state, hooks, routing, and reusable UI."
        },
        {
          id: 12,
          type: "Assignment",
          title: "React Dashboard Assignment",
          content:
            "Create a React dashboard using components, props, useState, routing, and charts.",
          questions: [
            {
              question: "Which hook manages state?",
              options: ["useState", "useEffect", "useRouter", "useData"],
              correct: "useState"
            },
            {
              question: "What is JSX?",
              options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "Java XML"],
              correct: "JavaScript XML"
            },
            {
              question: "Props are used to?",
              options: ["Pass data", "Style page", "Create database", "Run server"],
              correct: "Pass data"
            }
          ]
        }
      ]
    },
    {
      subject: "Python",
      icon: "🐍",
      color: "#16a34a",
      tasks: [
        {
          id: 13,
          type: "Video",
          title: "Python Full Course",
          link: "https://www.youtube.com/embed/_uQrJ0TkZlc"
        },
        {
          id: 14,
          type: "Notes",
          title: "Python Notes",
          content:
            "Python is beginner-friendly and used in web development, automation, AI, machine learning, and data science. Learn variables, loops, functions, lists, dictionaries, and file handling."
        },
        {
          id: 15,
          type: "Assignment",
          title: "Student Marks Analyzer Assignment",
          content:
            "Create a Python program to calculate total marks, percentage, grade, and result.",
          questions: [
            {
              question: "Which keyword defines function in Python?",
              options: ["def", "function", "method", "fun"],
              correct: "def"
            },
            {
              question: "Which data type stores multiple items?",
              options: ["list", "int", "float", "bool"],
              correct: "list"
            },
            {
              question: "Which symbol is used for comments?",
              options: ["#", "//", "/* */", "<!-- -->"],
              correct: "#"
            }
          ]
        }
      ]
    },
    {
      subject: "Data Science",
      icon: "📊",
      color: "#dc2626",
      tasks: [
        {
          id: 16,
          type: "Video",
          title: "Data Science Basics",
          link: "https://www.youtube.com/embed/ua-CiDNNj30"
        },
        {
          id: 17,
          type: "Notes",
          title: "Data Science Notes",
          content:
            "Data Science means collecting, cleaning, analyzing, and visualizing data. Tools include Python, Pandas, NumPy, Matplotlib, and Machine Learning."
        },
        {
          id: 18,
          type: "Assignment",
          title: "CSV Data Analysis Assignment",
          content:
            "Analyze CSV data using Pandas and show rows, columns, missing values, and charts.",
          questions: [
            {
              question: "Which library is used for data analysis?",
              options: ["Pandas", "React", "CSS", "HTML"],
              correct: "Pandas"
            },
            {
              question: "Which library is used for numerical operations?",
              options: ["NumPy", "HTML", "CSS", "Express"],
              correct: "NumPy"
            },
            {
              question: "Which library is used for visualization?",
              options: ["Matplotlib", "React", "Flask", "MongoDB"],
              correct: "Matplotlib"
            }
          ]
        }
      ]
    }
  ];

  const allTasks = courses.flatMap((course) =>
    course.tasks.map((task) => ({
      ...task,
      subject: course.subject,
      color: course.color
    }))
  );

  useEffect(() => {
    const savedCompleted =
      JSON.parse(localStorage.getItem(`completedTasks_${studentKey}`)) || [];

    setCompleted(savedCompleted);
  }, [studentKey]);

  useEffect(() => {
    if (selectedTask && selectedTask.type === "Video") {
      setVideoReady(false);
      setTimer(20);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setVideoReady(true);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedTask]);

  const updateProgress = async (newCompleted) => {
    setCompleted(newCompleted);

    localStorage.setItem(
      `completedTasks_${studentKey}`,
      JSON.stringify(newCompleted)
    );

    const progress = Math.round((newCompleted.length / allTasks.length) * 100);

    localStorage.setItem(`learningProgress_${studentKey}`, progress);

    if (student) {
      try {
        await fetch("http://127.0.0.1:5000/update-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: student.email,
            field: "learning",
            value: progress
          })
        });
      } catch (error) {
        console.log("Learning progress database update failed");
      }
    }
  };

  const completeTask = async (id) => {
    if (!completed.includes(id)) {
      const newCompleted = [...completed, id];
      await updateProgress(newCompleted);
    }
  };

  const openTask = (task, subject, color) => {
    setSelectedTask({ ...task, subject, color });
    setWrittenAnswer("");
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };

  const handleAnswerChange = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const nextQuestion = () => {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select answer before next.");
      return;
    }

    if (currentQuestion < selectedTask.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAssignment = async () => {
    if (writtenAnswer.trim() === "") {
      alert("Please write coding/practical answer.");
      return;
    }

    if (Object.keys(selectedAnswers).length !== selectedTask.questions.length) {
      alert("Please answer all MCQ questions.");
      return;
    }

    let score = 0;

    selectedTask.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });

    if (score < selectedTask.questions.length) {
      alert(`You scored ${score}/${selectedTask.questions.length}. Please correct MCQ answers.`);
      return;
    }

    await completeTask(selectedTask.id);
    alert("Assignment submitted successfully. Progress updated.");
  };

  const progress = Math.round((completed.length / allTasks.length) * 100);

  return (
    <div style={pageStyle}>
      <div style={headerCard}>
        <h1 style={titleStyle}>📚 Internship Learning Tracker</h1>

        <h2 style={{ color: "#0f172a" }}>Progress: {progress}%</h2>

        <div style={progressBg}>
          <div style={{ ...progressFill, width: progress + "%" }}>
            {progress}%
          </div>
        </div>
      </div>

      {selectedTask && (
        <div style={selectedCard}>
          <h2 style={{ color: selectedTask.color }}>
            {selectedTask.subject} - {selectedTask.title}
          </h2>

          {selectedTask.type === "Video" && (
            <>
              <iframe
                width="780"
                height="430"
                src={selectedTask.link}
                title={selectedTask.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <br />
              <br />

              {!videoReady ? (
                <p style={{ fontSize: "18px", color: "#0f172a" }}>
                  Please watch the video. Complete button unlocks in {timer} seconds.
                </p>
              ) : (
                <button onClick={() => completeTask(selectedTask.id)} style={mainButton}>
                  Complete Video
                </button>
              )}
            </>
          )}

          {selectedTask.type === "Notes" && (
            <>
              <p style={notesText}>{selectedTask.content}</p>

              <button onClick={() => completeTask(selectedTask.id)} style={mainButton}>
                Complete Notes
              </button>
            </>
          )}

          {selectedTask.type === "Assignment" && (
            <>
              <h3 style={{ color: "#0f172a" }}>📝 Assignment Task</h3>

              <p style={notesText}>{selectedTask.content}</p>

              <h3 style={{ color: "#0f172a" }}>
                MCQ Question {currentQuestion + 1} of{" "}
                {selectedTask.questions.length}
              </h3>

              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a" }}>
                {selectedTask.questions[currentQuestion].question}
              </p>

              <div style={{ textAlign: "left", width: "500px", margin: "auto" }}>
                {selectedTask.questions[currentQuestion].options.map((option, index) => (
                  <div key={index} style={optionBox}>
                    <input
                      type="radio"
                      name="mcq"
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={() => handleAnswerChange(option)}
                    />

                    <span style={{ marginLeft: "10px", color: "#0f172a" }}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>

              <br />

              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                style={smallButton}
              >
                Previous
              </button>

              {currentQuestion < selectedTask.questions.length - 1 ? (
                <button onClick={nextQuestion} style={smallButton}>
                  Next
                </button>
              ) : (
                <button
                  onClick={() =>
                    alert("MCQ completed. Now write practical answer and submit.")
                  }
                  style={smallButton}
                >
                  Finish MCQ
                </button>
              )}

              <h3 style={{ color: "#0f172a" }}>💻 Coding / Practical Answer</h3>

              <textarea
                value={writtenAnswer}
                onChange={(e) => setWrittenAnswer(e.target.value)}
                placeholder="Write your code or assignment answer here..."
                rows="8"
                cols="80"
                style={textareaStyle}
              ></textarea>

              <br />
              <br />

              <button onClick={submitAssignment} style={mainButton}>
                Submit Assignment
              </button>
            </>
          )}
        </div>
      )}

      <div style={courseGrid}>
        {courses.map((course, index) => (
          <div
            key={index}
            style={{ ...courseCard, borderTop: `8px solid ${course.color}` }}
          >
            <h2 style={{ color: course.color, fontSize: "32px" }}>
              {course.icon} {course.subject}
            </h2>

            <div style={taskRow}>
              {course.tasks.map((task) => (
                <div key={task.id} style={taskCard}>
                  <h3 style={{ color: "#0f172a" }}>
                    {task.type === "Video"
                      ? "🎥"
                      : task.type === "Notes"
                      ? "📘"
                      : "📝"}{" "}
                    {task.type}
                  </h3>

                  <p style={{ color: "#334155", fontSize: "17px" }}>
                    {task.title}
                  </p>

                  <button
                    onClick={() => openTask(task, course.subject, course.color)}
                    style={{ ...taskButton, backgroundColor: course.color }}
                  >
                    {task.type === "Video"
                      ? "Watch Video"
                      : task.type === "Notes"
                      ? "Open Notes"
                      : "Open Assignment"}
                  </button>

                  <p style={{ fontWeight: "bold", marginTop: "10px", color: "#0f172a" }}>
                    {completed.includes(task.id) ? "Completed ✅" : "Pending ⏳"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "55px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(30,58,138,0.78)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const headerCard = {
  width: "900px",
  margin: "0 auto 35px",
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "35px",
  borderRadius: "25px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(0,0,0,0.35)",
  color: "#0f172a"
};

const titleStyle = {
  fontSize: "44px",
  color: "#1e3a8a",
  marginBottom: "10px"
};

const progressBg = {
  width: "650px",
  backgroundColor: "#dbeafe",
  margin: "20px auto",
  borderRadius: "20px",
  overflow: "hidden"
};

const progressFill = {
  background: "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  padding: "12px",
  borderRadius: "20px",
  fontWeight: "bold",
  minWidth: "40px"
};

const selectedCard = {
  width: "950px",
  margin: "30px auto",
  backgroundColor: "rgba(255,255,255,0.98)",
  color: "#0f172a",
  padding: "40px",
  borderRadius: "25px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(0,0,0,0.35)"
};

const courseGrid = {
  width: "1150px",
  margin: "40px auto",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "30px"
};

const courseCard = {
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "32px",
  borderRadius: "25px",
  boxShadow: "0 0 25px rgba(0,0,0,0.30)",
  color: "#0f172a"
};

const taskRow = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "22px",
  marginTop: "20px"
};

const taskCard = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
  color: "#0f172a"
};

const taskButton = {
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

const mainButton = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px 32px",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold"
};

const smallButton = {
  backgroundColor: "#7c3aed",
  color: "white",
  border: "none",
  padding: "10px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  margin: "5px"
};

const notesText = {
  fontSize: "20px",
  lineHeight: "1.7",
  color: "#334155",
  backgroundColor: "#f8fafc",
  padding: "22px",
  borderRadius: "16px",
  textAlign: "left"
};

const optionBox = {
  backgroundColor: "#f1f5f9",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  color: "#0f172a"
};

const textareaStyle = {
  padding: "15px",
  fontSize: "16px",
  borderRadius: "12px",
  border: "1px solid #94a3b8",
  color: "#0f172a",
  backgroundColor: "white"
};

export default LearningTracker;