import express from 'express';
import { getCategories, getSubCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories); 
router.get('/:id/subcategories', getSubCategories); 

export default router;
