import request from 'supertest';
import app from '../src/app.js';

describe('Category Controller', () => {
    it('should get all categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get subcategories for a category id', async () => {
        const res = await request(app).get('/categories/1/subcategories');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
