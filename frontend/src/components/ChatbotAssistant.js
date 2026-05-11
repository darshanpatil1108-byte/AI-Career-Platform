import { useState } from "react";

function ChatbotAssistant() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState(
    "Hi 👋 I am your AI Career Assistant."
  );

  const askBot = async () => {
    if (msg.trim() === "") {
      alert("Ask something");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/answer",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            question: msg
          })
        }
      );

      const data = await response.json();

      setReply(data.answer);

    } catch (error) {

      setReply("Backend not connected");

    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={bubbleStyle}
      >
        💬
      </button>

      {open && (
        <div style={chatBox}>
          <h2>🤖 AI Assistant</h2>

          <div style={replyBox}>
            {reply}
          </div>

          <input
            type="text"
            placeholder="Ask anything..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={askBot}
            style={buttonStyle}
          >
            Ask AI
          </button>
        </div>
      )}
    </>
  );
}

const bubbleStyle = {
  position: "fixed",
  right: "25px",
  bottom: "25px",
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#2563eb",
  color: "white",
  fontSize: "32px",
  cursor: "pointer",
  zIndex: 999
};

const chatBox = {
  position: "fixed",
  right: "25px",
  bottom: "110px",
  width: "360px",
  backgroundColor: "white",
  padding: "22px",
  borderRadius: "20px",
  boxShadow: "0 0 20px rgba(0,0,0,0.35)",
  zIndex: 999
};

const replyBox = {
  backgroundColor: "#f1f5f9",
  padding: "15px",
  borderRadius: "12px",
  minHeight: "120px",
  marginBottom: "15px",
  lineHeight: "1.6"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #94a3b8"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default ChatbotAssistant;