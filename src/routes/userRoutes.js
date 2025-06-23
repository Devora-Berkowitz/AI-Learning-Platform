import express from 'express';
<<<<<<< HEAD
import { createUser, getUserHistory, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);                 
router.post('/', createUser);              
router.get('/:id/history', getUserHistory);
=======
import { createUser, getUserHistory } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser); // יצירת משתמש
router.get('/users/:id/history', getUserHistory); // היסטוריה של משתמש
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb

export default router;
