import { ai, getRelevantContext } from '../config/genkit.js';
import { ENV } from '../config/env.js';


const rateLimitStore = new Map();

const getRateLimitInfo = (ip) => {
    const now = Date.now();
    const record = rateLimitStore.get(ip);
    
    if (!record) {
        return { count: 0, resetTime: now + ENV.RATE_LIMIT_WINDOW };
    }
    
    if (now > record.resetTime) {
        rateLimitStore.delete(ip);
        return { count: 0, resetTime: now + ENV.RATE_LIMIT_WINDOW };
    }
    
    return record;
};

const updateRateLimit = (ip) => {
    const now = Date.now();
    const record = rateLimitStore.get(ip);
    
    if (!record || now > record.resetTime) {
        rateLimitStore.set(ip, {
            count: 1,
            resetTime: now + ENV.RATE_LIMIT_WINDOW
        });
        return { count: 1, resetTime: now + ENV.RATE_LIMIT_WINDOW };
    }
    
    record.count++;
    rateLimitStore.set(ip, record);
    return record;
};


setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitStore) {
        if (now > record.resetTime) {
            rateLimitStore.delete(ip);
        }
    }
}, 60000); // Clean every minute

export const handleChat = async (req, res) => {
    const { message } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';

    try {
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                reply: "Message is required and must be a string.",
                error: 'INVALID_INPUT'
            });
        }

        const trimmedMessage = message.trim();
        if (trimmedMessage.length === 0) {
            return res.status(400).json({ 
                reply: "Message cannot be empty.",
                error: 'EMPTY_MESSAGE'
            });
        }

        if (trimmedMessage.length > ENV.MAX_MESSAGE_LENGTH) {
            return res.status(400).json({ 
                reply: `Message exceeds maximum length of ${ENV.MAX_MESSAGE_LENGTH} characters.`,
                error: 'MESSAGE_TOO_LONG'
            });
        }

        const rateInfo = getRateLimitInfo(clientIp);
        if (rateInfo.count >= ENV.RATE_LIMIT_MAX) {
            const resetTime = new Date(rateInfo.resetTime).toISOString();
            return res.status(429).json({
                reply: `Rate limit exceeded. Please try again after ${resetTime}.`,
                error: 'RATE_LIMIT_EXCEEDED',
                resetTime
            });
        }
        updateRateLimit(clientIp);

   
        const context = await getRelevantContext(trimmedMessage);

        const systemPrompt = `You are the official BLINC Internship & Inquiry Assistant. 

CRITICAL RULES:
1. IDENTITY: If a user asks who or what you are, you must state that you are the BLINC Assistant AI.
2. CORE FOCUS ONLY: You only answer questions regarding BLINC Technologies and its internship program. 
3. NO MATH OR TRICKS: If a user asks general knowledge, math (e.g., "1+1"), or coding questions unrelated to BLINC, refuse politely. Tell them you only handle BLINC inquiries.
4. USE PROVIDED KNOWLEDGE: Only use the knowledge provided below. Do not make use of general knowledge.
5. If information is not in the knowledge base, say: "I do not have that information."

${context || 'No specific information found. Ask about BLINC company, internship programs, or Cryptosavers club.'}`;

        const { text } = await ai.generate({
            model: 'googleai/gemini-2.5-flash',
            system: systemPrompt,
            messages: [{ role: 'user', content: [{ text: trimmedMessage }] }],
            config: {
                temperature: 0.3,
                maxOutputTokens: 1024,
            }
        });

        console.log(`📝 Chat request from ${clientIp}:`, {
            messageLength: trimmedMessage.length,
            contextUsed: !!context,
            responseLength: text.length,
            timestamp: new Date().toISOString()
        });

        res.json({ 
            reply: text,
            source: 'knowledge-base',
            contextUsed: !!context,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Controller Error:", error);
        
        if (error.message?.includes('API key')) {
            return res.status(503).json({ 
                reply: "The AI service is temporarily unavailable. Please try again later.",
                error: 'AI_SERVICE_ERROR'
            });
        }

        res.status(500).json({ 
            reply: "I am currently undergoing maintenance. Please try again later.",
            error: 'INTERNAL_SERVER_ERROR',
            timestamp: new Date().toISOString()
        });
    }
};