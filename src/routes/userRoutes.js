import express from 'express';
import { createUser, getUserHistory } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser); // יצירת משתמש
router.get('/users/:id/history', getUserHistory); // היסטוריה של משתמש

export default router;
