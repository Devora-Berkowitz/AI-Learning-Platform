import request from 'supertest';
import app from '../src/app.js';
import jwt from 'jsonwebtoken';

describe('Prompt Controller', () => {
    const userToken = jwt.sign({ userId: 'user123', role: 'user' }, process.env.JWT_SECRET);
    const adminToken = jwt.sign({ userId: 'admin123', role: 'admin' }, process.env.JWT_SECRET);

    it('should return 403 if user is not admin', async () => {
        const res = await request(app)
            .get('/prompt/prompts')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
    });

    it('should return 200 and prompts when user is admin', async () => {
        const res = await request(app)
            .get('/prompt/prompts')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
