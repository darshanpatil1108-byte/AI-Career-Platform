import { useEffect, useState } from "react";

function AdminDashboard() {
  const [students, setStudents] = useState([]);

  const [course, setCourse] = useState({
    subject: "",
    type: "",
    title: "",
    content: "",
    video_url: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      alert("Backend not connected");
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const addCourse = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/add-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={mainCard}>
        <h1 style={titleStyle}>🛡️ Admin Dashboard</h1>

        <p style={subTitle}>
          Manage students, upload course videos, notes, and assignments.
        </p>

        <div style={cardStyle}>
          <h2 style={sectionTitle}>📚 Upload Course Content</h2>

          <input name="subject" placeholder="Subject" onChange={handleChange} style={inputStyle} />

          <input name="type" placeholder="Video / Notes / Assignment" onChange={handleChange} style={inputStyle} />

          <input name="title" placeholder="Title" onChange={handleChange} style={inputStyle} />

          <textarea name="content" placeholder="Notes or assignment content" onChange={handleChange} style={textareaStyle}></textarea>

          <input name="video_url" placeholder="YouTube Embed URL" onChange={handleChange} style={inputStyle} />

          <button onClick={addCourse} style={buttonStyle}>
            Add Course Content
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitle}>👨‍🎓 Registered Students</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={tableHead}>
                <th style={thTd}>Name</th>
                <th style={thTd}>Email</th>
                <th style={thTd}>Learning</th>
                <th style={thTd}>Resume</th>
                <th style={thTd}>Interview</th>
                <th style={thTd}>Roadmap</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td style={thTd}>{s.name}</td>
                  <td style={thTd}>{s.email}</td>
                  <td style={thTd}>{s.learning}%</td>
                  <td style={thTd}>{s.resume}%</td>
                  <td style={thTd}>{s.interview}%</td>
                  <td style={thTd}>{s.roadmap}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "70px",
  background:
    "linear-gradient(rgba(15,23,42,0.78), rgba(30,58,138,0.78)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed"
};

const mainCard = {
  width: "1150px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "45px",
  borderRadius: "30px",
  boxShadow: "0 0 35px rgba(0,0,0,0.35)",
  color: "#0f172a"
};

const titleStyle = {
  textAlign: "center",
  fontSize: "50px",
  color: "#1e3a8a",
  marginBottom: "10px"
};

const subTitle = {
  textAlign: "center",
  color: "#475569",
  fontSize: "19px",
  marginBottom: "35px"
};

const cardStyle = {
  background: "linear-gradient(135deg,#ffffff,#eff6ff)",
  padding: "30px",
  borderRadius: "22px",
  marginBottom: "30px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  color: "#0f172a"
};

const sectionTitle = {
  color: "#1e3a8a",
  fontSize: "28px"
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #94a3b8",
  fontSize: "16px",
  color: "#0f172a",
  backgroundColor: "white"
};

const textareaStyle = {
  width: "100%",
  height: "120px",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #94a3b8",
  fontSize: "16px",
  color: "#0f172a",
  backgroundColor: "white"
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  fontSize: "17px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  color: "#0f172a"
};

const tableHead = {
  backgroundColor: "#dbeafe"
};

const thTd = {
  padding: "14px",
  borderBottom: "1px solid #cbd5e1",
  textAlign: "left",
  color: "#0f172a"
};

export default AdminDashboard;