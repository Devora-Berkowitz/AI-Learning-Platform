import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import promptRoutes from './routes/promptRoutes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerOptions.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:8080',
  'https://fascinating-sherbet-ead8d3.netlify.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/prompt', promptRoutes);

export default app;
