# 🏠 Real Estate Chatbot for ID Properties (Dubai)

This project is a real estate chatbot built using **React** for the frontend and **Express.js** for the backend. The chatbot interacts with the [DeepSeek](https://deepseek.com/) API to respond to user queries about Dubai properties. It also includes **voice input** support, basic markdown formatting for responses, and a sleek UI suitable for professional presentations or investor demos.

---

## 🚀 Features

- ✨ Chat interface with live messaging
- 🎤 Voice input via browser speech recognition
- 🤖 Integration with DeepSeek API for AI-powered responses
- 💬 Markdown cleaning and formatting for chatbot replies
- 🌐 Cross-Origin enabled communication between client and server
- 💡 Smooth scrolling and state management with React Hooks
- 🧠 User + Bot conversation flow

---

## 🧩 Tech Stack

### Frontend
- React
- Axios
- CSS (custom, not Tailwind)
- React Icons

### Backend
- Express.js
- Axios
- CORS
- Body-parser

### API
- [DeepSeek API](https://deepseek.com/) – used for chat completions

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js and npm installed
- Internet connection (to call DeepSeek API)
- DeepSeek API Key (already included in server for now — **replace in production**)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/dubai-real-estate-chatbot.git
cd dubai-real-estate-chatbot

 2. Backend Setup

 cd server
npm install
node index.js

The server will run on http://localhost:5000

3. Frontend Setup

cd client/chatbot
npm install
npm start

The React app will run on http://localhost:3000

📁 Project Structure

IDProperties_Chat-bot/
├── client/
│   └── chatbot/
│       ├── public/
│       ├── src/
│       │   ├── App.js
│       │   ├── App.css
│       │   ├── index.js
│       │   └── components/
│       │       └── Chatbot.js
├── server/
│   └── index.js


🧪 Usage


Type your message in the input box and click Send.

Or click the microphone icon to speak your query.

The chatbot will respond using the DeepSeek API.

Works best for real estate-related inquiries about Dubai.

📌 Environment Variables

In production, move the API key to an environment variable:

DEEPSEEK_API_KEY=your_deepseek_key_here

Update the backend to use:


const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

⚠️ Security Notes
Do not expose your DeepSeek API key in frontend code.

Use .env and dotenv in Express for secure config management.

Consider rate limiting and input sanitization in production.

📞 Contact
Made by Siyamtanda Ndzima (ID Properties)

For any queries, suggestions, or collaboration:
📧 siyamthanda960715@gmail.com