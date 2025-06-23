import express from 'express';
import { createUser, getUserHistory, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);                 
router.post('/', createUser);              
router.get('/:id/history', getUserHistory);

export default router;
