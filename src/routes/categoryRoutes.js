import express from 'express';
import { getCategories, getSubCategories } from '../controllers/categoryController.js';

const router = express.Router();

<<<<<<< HEAD
router.get('/', getCategories); 
router.get('/:id/subcategories', getSubCategories); 
=======
router.get('/categories', getCategories); // כל הקטגוריות
router.get('/categories/:id/subcategories', getSubCategories); // תתי קטגוריות לפי קטגוריה
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb

export default router;
