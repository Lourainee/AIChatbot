import Chat from '../models/Chat.js';

export const saveConversation = async (userMessage, aiResponse) => {

    try {

        await Chat.create({
            userMessage,
            aiResponse
        });

        console.log("Conversation saved.");

    }
    catch (error) {

        console.error("Database Error:", error);

    }

};