import { Router } from 'express';
import { sendMessage } from '../controllers/whatsappController.js';

const router = Router();

router.post('/send-message', sendMessage);

export default router;
