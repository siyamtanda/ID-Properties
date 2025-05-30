import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const DEEPSEEK_API_KEY = "sk-b214bf80eeda4a46a00e34f4cd889cea";

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
                model: "deepseek-chat",
                messages: [{ role: "user", content: message }],
            },
            {
                headers: { Authorization: `Bearer ${DEEPSEEK_API_KEY}` },
            }
        );

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error("DeepSeek API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
