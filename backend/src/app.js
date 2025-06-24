import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import promptRoutes from './routes/promptRoutes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerOptions.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/prompt', promptRoutes);

export default app;
