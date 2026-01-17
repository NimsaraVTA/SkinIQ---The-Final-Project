import React, { useState } from "react";
import Card from "../../atoms/Card/Card";
import Button from "../../atoms/Button/Button";
import { Send } from "lucide-react";
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
    <>
      <div className="dashboard-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>AI Skin Chat Assistant</h2>
        </div>

        <Card className="chat-dashboard-card">
          <h5 className="card-title-bordered">GPT-5 Chat</h5>

          <div className="chat-scroll-area">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about acne, skincare routines, ingredients..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="primary" onClick={handleSend}>
              <Send size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AIChatDashboard;
