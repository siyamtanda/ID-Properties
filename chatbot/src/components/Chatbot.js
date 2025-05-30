import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });
      setMessages([...newMessages, { sender: "bot", text: response.data.response }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Error: Unable to fetch response." }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto h-screen bg-gray-900 text-white p-4 shadow-lg rounded-lg">
      <div className="flex items-center justify-center text-lg font-bold py-4 border-b border-gray-700">Real Estate Chatbot</div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex items-center p-2 border-t border-gray-700">
        <input
          className="flex-1 p-2 bg-gray-700 text-white border-none rounded-lg focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a property..."
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
