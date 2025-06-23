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

app.use('/users', userRoutes);        
app.use('/categories', categoryRoutes); 
app.use('/prompt', promptRoutes);      

export default app;
