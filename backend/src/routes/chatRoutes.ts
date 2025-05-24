import { Router } from 'express';
import { startChat, sendMessage, endChat, getChat } from '../controllers/chatController';

const router = Router();

router.post('/start-chat', startChat);
router.post('/send-message', sendMessage);
router.get('/chats', getChat);
export default router;
