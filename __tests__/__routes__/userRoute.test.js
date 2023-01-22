import request from 'supertest';
import app from '../../src/app.js';
import { dropCollections, dropDatabase, setup } from '../../src/helper/dbConnectionHelper.js';
import dummyData from '../__dummyData__/userDummyData.js';

const { emailCheck, testUser, errorResp, emailCheckResponse, passCheck, passCheckResponse } = dummyData;

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await dropCollections();
  await dropDatabase();
});

describe('User Routes', () => {
  test('Test Route for the user /api/v1/user get()', async () => {
    const res = await request(app).get('/api/v1/user/');
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
  });

  test('should register at /api/v1/user/register', async () => {
    const res = await request(app).post('/api/v1/user/register').send(testUser);
    const { user, token } = res.body.data;
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.message).toBe('Success');
    expect(res.body.data).not.toBeUndefined();
    expect(user).not.toBeUndefined();
    expect(user.userName).toBe('jamesBond');
    expect(token).toBeDefined();
  });

  test('should register at /api/v1/user/register', async () => {
    const res = await request(app).post('/api/v1/user/register').send(testUser);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.message).toBe('Please go for Login');
    expect(res.body.data).not.toBeUndefined();
    expect(res.body.data).toEqual({});
  });

  test('should fail register with validation errors at /api/v1/user/register', async () => {
    const res = await request(app).post('/api/v1/user/register').send();
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.errors).not.toBeUndefined();
    expect(res.body.errors).toEqual(errorResp);
  });

  test('should fail with email error on register at /api/v1/user/register', async () => {
    const res = await request(app).post('/api/v1/user/register').send(emailCheck);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.errors).not.toBeUndefined();
    expect(res.body.errors).toEqual(emailCheckResponse);
  });

  test('should fail with password error on register at /api/v1/user/register', async () => {
    const res = await request(app).post('/api/v1/user/register').send(passCheck);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.errors).not.toBeUndefined();
    expect(res.body.errors).toEqual(passCheckResponse);
  });
});
