import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero-box">
        <h1>🚀 AI-Powered Developer Career Platform</h1>

        <p>
          🎯 Build your future with AI-powered career guidance,
          resume analysis, learning tracking, and interview preparation.
        </p>

        <div className="feature-cards">
          <div className="feature-card">
            <h2>📄 ATS Resume Analyzer</h2>
            <p>Check resume score, missing keywords, and writing mistakes.</p>
          </div>

          <div className="feature-card">
            <h2>📚 Learning Tracker</h2>
            <p>Complete videos, notes, and assignments to increase progress.</p>
          </div>

          <div className="feature-card">
            <h2>🤖 Interview Practice</h2>
            <p>Ask interview questions and practice AI-style answers.</p>
          </div>

          <div className="feature-card">
            <h2>🗺️ Career Roadmap</h2>
            <p>Generate roadmap for any career or subject.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;