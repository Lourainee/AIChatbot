import { ai } from '../config/genkit.js';

export const handleChat = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "Message is required." });
    }

    try {
        const systemPrompt = `You are the official BLINC Internship & Inquiry Assistant. 
        
        CRITICAL RULES:
        1. IDENTITY: If a user asks who or what you are, you must state that you are the BLINC Assistant AI.
        2. CORE FOCUS ONLY: You only answer questions regarding BLINC Technologies and its internship program. 
        3. NO MATH OR TRICKS: If a user asks general knowledge, math (e.g., "1+1"), or coding questions unrelated to BLINC, refuse politely. Tell them you only handle BLINC inquiries.`;

        const { text } = await ai.generate({
            model: 'googleai/gemini-2.5-flash',
            system: systemPrompt,
            messages: [{ role: 'user', content: [{ text: message }] }]
        });

        res.json({ reply: text });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ reply: "I am currently undergoing maintenance. Please try again later." });
    }
};