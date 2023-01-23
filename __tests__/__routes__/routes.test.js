import request from 'supertest';
import app from '../../src/app.js';
import { dropCollections, dropDatabase, setup } from '../../src/helper/dbConnectionHelper.js';
import dummyData from '../__dummyData__/userDummyData.js';
import { expect, test } from '@jest/globals';
const {
  emailCheck,
  testUser,
  errorResp,
  emailCheckResponse,
  passCheck,
  passCheckResponse,
  loginError,
  wrongUser,
  wrongPass,
  correctUser,
} = dummyData;
let authToken = '';
beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await dropCollections();
  await dropDatabase();
});

describe('User Routes', () => {
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

describe('User Login Route', () => {
  test('Should not Login with no data', async () => {
    const res = await request(app).post('/api/v1/user/login').send();
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.errors).not.toBeUndefined();
    expect(res.body.errors).toEqual(loginError);
  });

  test('Should not Login with wrong userName', async () => {
    const res = await request(app).post('/api/v1/user/login').send(wrongUser);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.error).not.toBeUndefined();
    expect(res.body.error).toEqual('Not a valid user credentials ');
  });

  test('Should not Login with wrong password ', async () => {
    const res = await request(app).post('/api/v1/user/login').send(wrongPass);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.error).not.toBeUndefined();
    expect(res.body.error).toEqual('Password incorrect');
  });

  test('Should login with correct data ', async () => {
    const res = await request(app).post('/api/v1/user/login').send(correctUser);
    const { user, token } = res.body.data;
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.message).toBe('LOGGED_IN_SUCCESS');
    expect(res.body.data).not.toBeUndefined();
    expect(user).not.toBeUndefined();
    expect(user.userName).toBe('jamesBond');
    expect(token).toBeDefined();
    authToken = token;
  });
  test('Test Route for the user /api/v1/user get()', async () => {
    const res = await request(app).get('/api/v1/user/').set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('GOT_ALL_USERS');
  });
});

const todo = {
  todoId: '',
};

describe('Todo Routes', () => {
  test('Test Route for the user /api/v1/todo get()', async () => {
    const res = await request(app).get('/api/v1/todo/');
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(401);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('UNAUTHORIZED');
  });

  test('Test Route for the user to create POST-> /api/v1/todo', async () => {
    const res = await request(app)
        .post('/api/v1/todo/')
        .send({
          title: 'This is the new',
          description: 'The test wot work',
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).toBeFalsy();
    expect(res.body.status).toBe('SUCCESS');
    todo.todoId = res.body.data._id;
  });
  test('Test Route for the user to edit TODo POST-> /api/v1/todo', async () => {
    const res = await request(app)
        .post(`/api/v1/todo/${todo.todoId}`)
        .send({
          title: 'Tis is edit',
          description: 'The test wot work',
          isCompleted: true,
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).toBe(true);
    expect(res.body.data.title).toBeDefined();
    expect(res.body.data.title).toBe('Tis is edit');
    expect(res.body.status).toBe('Updated the todo');
  });

  test('Test Route for the user to edit TODo POST-> /api/v1/todo', async () => {
    const res = await request(app)
        .post(`/api/v1/todo/123456879`)
        .send({
          title: 'Tis is edit',
          description: 'The test wot work',
          isCompleted: true,
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).not.toBeDefined();
    expect(res.body.data.title).not.toBeDefined();
    expect(res.body.data.title).not.toBe('Tis is edit');
    expect(res.body.status).toBe('Please check the todo id');
  });

  test('Test Route for the user to edit TODo POST-> /api/v1/todo', async () => {
    const res = await request(app).put(`/api/v1/todo/12345678`).set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).not.toBeDefined();
    expect(res.body.data.title).not.toBeDefined();
    expect(res.body.data.title).not.toBe('Tis is edit');
    expect(res.body.status).toBe('Please check the todo id');
  });

  test('Test Route for the user to Edit to Complete-> PUT /api/v1/todo', async () => {
    const res = await request(app).put(`/api/v1/todo/${todo.todoId}`).set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).toBe(true);
    expect(res.body.data.title).toBeDefined();
    expect(res.body.data.title).toBe('Tis is edit');
    expect(res.body.status).toBe('Updated the todo');
  });

  test('Test Route for the user to edit TODo POST-> /api/v1/todo', async () => {
    const res = await request(app).delete(`/api/v1/todo/12345678`).set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).not.toBeDefined();
    expect(res.body.data.title).not.toBeDefined();
    expect(res.body.data.title).not.toBe('Tis is edit');
    expect(res.body.status).toBe('Please check the todo id');
  });

  test('Test Route for the user to create POST-> /api/v1/todo', async () => {
    const res = await request(app).delete(`/api/v1/todo/${todo.todoId}`).set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.data.isCompleted).toBe(true);
    expect(res.body.data.title).toBeDefined();
    expect(res.body.data.title).toBe('Tis is edit');
    expect(res.body.status).toBe('Deleted the todo');
  });

  test('Test Route for the user /api/v1/todo', async () => {
    const res = await request(app).get('/api/v1/todo/').set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
  });
});

const postObj = {
  postID: '',
};
describe('Post Routes', () => {
  test('Should not Access with out authorization /api/v1/post', async () => {
    const res = await request(app).get('/api/v1/post/');
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(401);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('UNAUTHORIZED');
  });

  test('Should Access with authorization and Create /api/v1/post', async () => {
    const res = await request(app)
        .post('/api/v1/post/')
        .send({
          title: 'this is new Post asdfasdf',
          postBody:
     'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('POST_CREATED');
    postObj.postID = res.body.data._id;
  });

  test('Should Access with authorization and not edit  /api/v1/post', async () => {
    const res = await request(app)
        .put('/api/v1/post/1321654654')
        .send({
          title: 'this',
          postBody:
     'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or ',
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(400);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('Wrong post Id pls check');
  });

  test('Should Access with authorization and not edit  /api/v1/post', async () => {
    const res = await request(app)
        .put(`/api/v1/post/${postObj.postID}`)
        .send({
          title: 'this',
          postBody:
     'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or ',
        })
        .set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('POST_EDITED');
  });
  test('Should  Access with authorization /api/v1/post', async () => {
    const res = await request(app).get('/api/v1/post/').set('x-social-media-todo-token', `${authToken}`);
    expect(res.headers['x-application-identifier']).toBe('social-media-todo-test');
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toBeUndefined();
    expect(res.body.status).toBe('SUCCESS');
  });
});
