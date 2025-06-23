import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import promptRoutes from './routes/promptRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use('/users', userRoutes);        
app.use('/categories', categoryRoutes); 
app.use('/prompt', promptRoutes);      
=======
// Routes
app.use('/users', userRoutes);          // כל מה שקשור ל-users:  /users, /users/:id/history
app.use('/categories', categoryRoutes); // כל מה שקשור ל-categories: /categories, /categories/:id/subcategories
app.use('/prompt', promptRoutes);       // כל מה שקשור ל-prompt: /prompt
>>>>>>> 4f118f4d081d3bd1d04e9f56afc82f4478fd99fb

export default app;
