import express from 'express';
import { createPrompt, getAllPrompts } from '../controllers/promptController.js';

const router = express.Router();

router.post('/', createPrompt); 
router.get('/prompts', getAllPrompts); 

export default router;
