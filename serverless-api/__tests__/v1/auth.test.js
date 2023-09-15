const request = require('supertest');
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const shared = require('./shared');

describe('USERS TESTS', () => {

  beforeAll(async () => {
    await shared.removeTests('users', apiUrl, token);
  });

  afterAll(async () => {
    await shared.removeTests('users', apiUrl, token);
  });

  describe('POST /auth/v1/register', () => {
    let postUserId, userId = null;

    afterEach(async () => {
      if (userId && token) {
        const response = await request(apiUrl)
          .delete(`/api/v1/users/${userId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);
        userId = null;
      }
    });

    test('Successful registration', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'User',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe('test@test.com');

      postUserId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });

    test('Registration fail with existing email', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: 'test',
          firstName: 'Test',
          lastName: 'User',
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toBe('Email already registered');

      userId = postUserId;
      // userId = response.body.user !== undefined 
      //   ? response.body.user.id : null;
    });

    test('Fail social login/registration with missing email', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          password: '123456789',
          firstName: "testFirstName",
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');
    });
    
    test('Fail social login/registration with missing password', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          firstName: "testFirstName",
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');
    });

    test('Fail social login/registration with missing firstName', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: '123456789',
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');
    });
    
    test('Fail social login/registration with missing lastName', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: '123456789',
          firstName: "testFirstName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');
    });
  });

  describe('POST /auth/v1/login', () => {
    let responseUser;
    
    beforeAll(async () => {
      responseUser = await shared.createUser(apiUrl, token);
      expect(responseUser.body.error).toBeUndefined();
      expect(responseUser.statusCode).toBe(200);
    });

    afterAll(async () => {
      await shared.deleteUser(responseUser.id, apiUrl, token);
    });
    
    test('should return token when user logs in', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/login')
        .send({
          email: 'test@test.com',
          password: 'test',
        }
      );
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    test('Fail login with wrong password', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/login')
        .send({
          email: 'test@test.com',
          password: 'wrong',
        });
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('InvalidCredentialsException');
    });

    test('Fail login with missing password', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/login')
        .send({
          email: 'test@test.com',
        });
        expect(response.status).toEqual(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toEqual(23);
        expect(response.body.error.message).toEqual(
          'InvalidCredentialsException'
        );
    });

    test('Fail login with missing email', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/login')
        .send({
          password: 'wrong password',
        });
        expect(response.status).toEqual(404);
        expect(response.body.error).toBeDefined();
        expect(response.body.error.code).toEqual(23);
        expect(response.body.error.message).toEqual(
          'InvalidCredentialsException'
        );
    });

  });

  describe('POST /auth/v1/social', () => {
    let userId = null;

    afterEach(async () => {
      if (userId && token) {
        const response = await request(apiUrl)
          .delete(`/api/v1/users/${userId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);
        userId = null;
      }
    });

    test('Successful social login/registration', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/social')
        .send({
          email: 'test@test.com',
          wixId: 'testWixId',
          firstName: "testFirstName",
          lastName: "testLastName"
        });

      expect(response.body).not.toHaveProperty('error');
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe('test@test.com');

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });

    test('Fail social login/registration with missing email', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/social')
        .send({
          wixId: 'testWixId',
          firstName: "testFirstName",
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });
    
    test('Fail social login/registration with missing wixId', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/social')
        .send({
          email: 'test@test.com',
          firstName: "testFirstName",
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });

    test('Fail social login/registration with missing firstName', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/social')
        .send({
          email: 'test@test.com',
          wixId: 'testWixId',
          lastName: "testLastName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });
    
    test('Fail social login/registration with missing lastName', async () => {
      const response = await request(apiUrl)
        .post('/auth/v1/social')
        .send({
          email: 'test@test.com',
          wixId: 'testWixId',
          firstName: "testFirstName",
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toContain('is required.');

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });
  });
});

