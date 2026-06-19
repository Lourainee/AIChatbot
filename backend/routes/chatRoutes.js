import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

// The endpoint is just '/', which will be mounted to '/api/chat' in index.js
router.post('/', handleChat);

export default router;