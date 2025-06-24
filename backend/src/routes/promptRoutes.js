import express from 'express';
import { createPrompt, getAllPrompts } from '../controllers/promptController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: API for prompts management
 */

/**
 * @swagger
 * /prompt:
 *   post:
 *     tags: [Prompts]
 *     summary: Create a new prompt
 *     requestBody:
 *       description: Prompt data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Sample prompt text"
 *     responses:
 *       200:
 *         description: Prompt created successfully
 */
router.post('/', createPrompt);

/**
 * @swagger
 * /prompt/prompts:
 *   get:
 *     tags: [Prompts]
 *     summary: Get all prompts (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prompts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/prompts', authenticateToken, getAllPrompts);

export default router;
