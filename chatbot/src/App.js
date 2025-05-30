import React, { useState } from "react";
import axios from "axios";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import "./App.css";

export default function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [listening, setListening] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChat((prev) => [...prev, userMessage]);
        setMessage("");

        try {
            const { data } = await axios.post("http://localhost:5000/chat", { message });
            setChat((prev) => [...prev, { sender: "bot", text: data.response }]);
        } catch (error) {
            setChat((prev) => [...prev, { sender: "bot", text: "Error getting response." }]);
        }
    };

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            setMessage(event.results[0][0].transcript);
        };
        recognition.onend = () => setListening(false);
    };

    const formatBotResponse = (text) => {
        if (!text) return "";

        let clean = text
            .replace(/#+\s*/g, "")                           // Remove markdown headers
            .replace(/\*\*(.*?)\*\*/g, "$1")                 // Remove bold markdown
            .replace(/```[\s\S]*?```/g, "")                  // Remove code blocks
            .replace(/\n{2,}/g, "\n\n")                      // Collapse multiple line breaks
            .trim();

        const parts = clean.split("\n").map(p => p.trim()).filter(Boolean);
        return parts.map((p, idx) => <p key={idx}>{p}</p>);
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                <div className="chat-messages">
                    {chat.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.sender}`}>
                            <div className="message-bubble">
                                {msg.sender === "bot" ? formatBotResponse(msg.text) : msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <button
                        onClick={startListening}
                        className={`mic-button ${listening ? "listening" : ""}`}
                    >
                        <FaMicrophone />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask anything about Dubai properties..."
                    />
                    <button onClick={sendMessage} className="send-button">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}
