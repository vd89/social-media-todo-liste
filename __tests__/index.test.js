import request from 'supertest';
import app from '../src/app.js';

describe('-> App Basic and first routes', () => {
  test('-> Server Api Route api/', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
  });

  test('-> The ping Route should give the response pong', async () => {
    const res = await request(app).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
    expect(res.body.data.pongDetails).toBe('This is the the pong response');
  });

  test('-> With wrong route', async () => {
    const res = await request(app).get('/pi');
    expect(res.statusCode).toBe(404);
    expect(res.body.data.msg).toBe('🔍 Not Found -/pi');
  });
});
