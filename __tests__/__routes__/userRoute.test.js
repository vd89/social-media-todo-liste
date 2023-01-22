import request from 'supertest';
import app from '../../src/app.js';

describe('User Routes', () => {
  test('Test Route for the user /api/v1/user get()', async () => {
    const res = await request(app).get('/api/v1/user/');
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
  });
});
