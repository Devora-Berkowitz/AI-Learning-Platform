import request from 'supertest';
import app from '../src/app.js';
import { v4 as uuidv4 } from 'uuid';

describe('User Controller', () => {
    it('should create a new user successfully', async () => {
        const res = await request(app).post('/users').send({
            id: uuidv4(),
            name: 'John',
            phone: '0501234567',
            password: '123456',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should fail creating user if required fields are missing', async () => {
        const res = await request(app).post('/users').send({ name: 'John' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
