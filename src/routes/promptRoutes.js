import express from 'express';
import { createPrompt } from '../controllers/promptController.js';

const router = express.Router();

router.post('/prompt', createPrompt); // יצירת prompt חדש עם קריאה ל־OpenAI

export default router;
