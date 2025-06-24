import express from 'express';
import { getCategories, getSubCategories } from '../controllers/categoryController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for categories management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieve all categories
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}/subcategories:
 *   get:
 *     tags: [Categories]
 *     summary: Retrieve subcategories for a specific category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/:id/subcategories', getSubCategories);

export default router;
