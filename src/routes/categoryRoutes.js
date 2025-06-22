import express from 'express';
import { getCategories, getSubCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories', getCategories); // כל הקטגוריות
router.get('/categories/:id/subcategories', getSubCategories); // תתי קטגוריות לפי קטגוריה

export default router;
