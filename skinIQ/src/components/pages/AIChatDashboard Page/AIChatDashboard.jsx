import React, { useState } from "react";
import Card from "../../atoms/Card/Card";
import "./AIChat.css";

const AIChatDashboard = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi 👋 I’m your AI Skin Assistant. How can I help?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="dashboard-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>AI Skin Chat Assistant</h2>
      </div>

      <Card className="chat-dashboard-card">
        <h5 className="card-title-bordered">Chatbase AI Chat</h5>

        <div className="iframe-container" style={{ width: "100%", height: "700px" }}>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/h-IPSgChj0hYl-6pYTpdV"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Chatbase AI Chat"
          ></iframe>
        </div>
      </Card>
    </div>
  );
};
// Chatbase account link: https://www.chatbase.co/dashboard/culture-intelligences-workspace/chatbot/h-IPSgChj0hYl-6pYTpdV/deploy
export default AIChatDashboard;
