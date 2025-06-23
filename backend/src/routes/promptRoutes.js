import express from 'express';
<<<<<<< HEAD
import { createPrompt, getAllPrompts } from '../controllers/promptController.js';

const router = express.Router();

router.post('/', createPrompt); 
router.get('/prompts', getAllPrompts); 
=======
import { createPrompt } from '../controllers/promptController.js';

const router = express.Router();

router.post('/prompt', createPrompt); // יצירת prompt חדש עם קריאה ל־OpenAI
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb

export default router;
