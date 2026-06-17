import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Genkit with Gemini
const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })]
});

console.log("Running in STRICT TESTING mode (No Database Required)");

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        // The STRICT Testing Prompt
        const systemPrompt = `You are the official BLINC Internship & Inquiry Assistant. 
        
        CRITICAL RULES:
        1. IDENTITY: If a user asks who or what you are, you must state that you are the BLINC Assistant AI.
        2. CORE FOCUS ONLY: You only answer questions regarding BLINC Technologies and its internship program. 
        3. NO MATH OR TRICKS: If a user asks general knowledge, math (e.g., "1+1"), or coding questions unrelated to BLINC, refuse politely. Tell them you only handle BLINC inquiries.`;

        // Send the message straight to Gemini 2.5 Flash
        const { text } = await ai.generate({
            model: 'googleai/gemini-2.5-flash',
            system: systemPrompt,
            messages: [{ role: 'user', content: [{ text: message }] }]
        });

        res.json({ reply: text });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ reply: "I am currently undergoing maintenance. Please try again later." });
    }
});

app.listen(3000, () => console.log('Test Server running on port 3000'));