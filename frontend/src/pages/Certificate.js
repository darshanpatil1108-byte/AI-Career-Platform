import jsPDF from "jspdf";

function Certificate() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));

  const learning =
    Number(localStorage.getItem(`learningProgress_${student?.email}`)) || 0;

  const resume =
    Number(localStorage.getItem(`resumeProgress_${student?.email}`)) || 0;

  const interview =
    Number(localStorage.getItem(`interviewProgress_${student?.email}`)) || 0;

  const roadmap =
    Number(localStorage.getItem(`roadmapProgress_${student?.email}`)) || 0;

  const totalProgress = Math.round(
    (learning + resume + interview + roadmap) / 4
  );

  const downloadPDF = () => {
    if (totalProgress < 90) {
      alert("Complete at least 90% progress to download certificate");
      return;
    }

    const doc = new jsPDF("landscape", "mm", "a4");

    doc.setFillColor(245, 248, 255);
    doc.rect(0, 0, 297, 210, "F");

    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(4);
    doc.rect(12, 12, 273, 186);

    doc.setDrawColor(147, 197, 253);
    doc.setLineWidth(1.5);
    doc.rect(20, 20, 257, 170);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.setTextColor(30, 58, 138);
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 45, {
      align: "center"
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.setTextColor(71, 85, 105);
    doc.text("This certificate is proudly presented to", 148.5, 65, {
      align: "center"
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(124, 58, 237);
    doc.text(student ? student.name : "Student Name", 148.5, 85, {
      align: "center"
    });

    doc.setDrawColor(124, 58, 237);
    doc.line(90, 90, 207, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.setTextColor(31, 41, 55);
    doc.text("for successfully completing the", 148.5, 108, {
      align: "center"
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text("AI Career Platform Internship Program", 148.5, 123, {
      align: "center"
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);

    const description =
      "This program included Resume ATS Analysis, AI Interview Practice, Career Roadmap Generation, Learning Tracker, Dashboard Analytics, and Certificate Generation.";

    const splitDescription = doc.splitTextToSize(description, 230);

    doc.text(splitDescription, 148.5, 138, {
      align: "center"
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 58, 138);

    doc.text(`Register No: ${student?.register_number || student?.registerNumber || "N/A"}`, 40, 165);
    doc.text(`Email: ${student?.email || "N/A"}`, 40, 175);

    doc.text(`Progress: ${totalProgress}%`, 205, 165);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 205, 175);

    doc.setDrawColor(0, 0, 0);
    doc.line(45, 190, 105, 190);
    doc.line(195, 190, 255, 190);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Mentor Signature", 75, 198, { align: "center" });
    doc.text("Authorized Signature", 225, 198, { align: "center" });

    doc.setDrawColor(220, 38, 38);
    doc.setTextColor(220, 38, 38);
    doc.setLineWidth(1.5);
    doc.circle(148.5, 168, 18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("VERIFIED", 148.5, 165, { align: "center" });
    doc.text("CERTIFICATE", 148.5, 172, { align: "center" });

    doc.save("AI_Career_Platform_Certificate.pdf");
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🏆 Certificate of Completion</h1>

        <p style={subTitle}>This certificate is proudly awarded to</p>

        <h2 style={nameStyle}>{student ? student.name : "Student Name"}</h2>

        <p style={descStyle}>
          For successfully completing the AI Career Platform Internship Program.
        </p>

        <div style={progressBox}>
          <h2>Final Progress: {totalProgress}%</h2>

          <div style={progressBg}>
            <div
              style={{
                ...progressFill,
                width: `${totalProgress}%`
              }}
            >
              {totalProgress}%
            </div>
          </div>
        </div>

        {totalProgress >= 90 ? (
          <button onClick={downloadPDF} style={buttonStyle}>
            📄 Download PDF Certificate
          </button>
        ) : (
          <h3 style={{ color: "red" }}>
            Complete at least 90% progress to unlock certificate.
          </h3>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "70px",
  background:
    "linear-gradient(rgba(15,23,42,0.82), rgba(30,58,138,0.82)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const cardStyle = {
  width: "950px",
  margin: "auto",
  backgroundColor: "rgba(255,255,255,0.97)",
  padding: "55px",
  borderRadius: "28px",
  textAlign: "center",
  color: "#111827",
  boxShadow: "0 0 35px rgba(0,0,0,0.4)",
  border: "6px solid #2563eb"
};

const titleStyle = {
  fontSize: "48px",
  color: "#1e3a8a",
  marginBottom: "20px"
};

const subTitle = {
  fontSize: "22px",
  color: "#475569"
};

const nameStyle = {
  fontSize: "45px",
  color: "#7c3aed",
  margin: "25px 0",
  borderBottom: "3px solid #7c3aed",
  display: "inline-block",
  padding: "0 45px 10px"
};

const descStyle = {
  fontSize: "22px",
  lineHeight: "1.6",
  color: "#334155"
};

const progressBox = {
  margin: "35px auto",
  width: "650px"
};

const progressBg = {
  width: "100%",
  backgroundColor: "#dbeafe",
  borderRadius: "20px",
  overflow: "hidden"
};

const progressFill = {
  background: "linear-gradient(90deg,#2563eb,#7c3aed)",
  color: "white",
  padding: "13px",
  borderRadius: "20px",
  fontWeight: "bold"
};

const buttonStyle = {
  padding: "16px 38px",
  fontSize: "20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Certificate;