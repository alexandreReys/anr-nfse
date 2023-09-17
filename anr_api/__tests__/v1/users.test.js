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

  describe('UPDATE /api/v1/users/:id', () => {
    let userId = null;

    beforeEach(async () => {
      // Register a user
      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'User',
        });

      userId = response.body.user !== undefined 
        ? response.body.user.id : null;
    });

    afterEach(async () => {
      if (userId && token) {
        const response = await request(apiUrl)
          .delete(`/api/v1/users/${userId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);
        userId = null;
      }
    });

    test('Successful user update', async () => {
      // Then, update the user
      const response = await request(apiUrl)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', token)
        .send({
          firstName: 'Updated',
          lastName: 'User',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.firstName).toBe('Updated');
      expect(response.body.user.lastName).toBe('User');
    });

    test('User update fail with non-existent user', async () => {
      const response = await request(apiUrl)
        .put('/api/v1/users/123456789')
        .set('Authorization', token)
        .send({
          firstName: 'Updated',
          lastName: 'User',
        });

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });

    test('User update fail with existing wixId', async () => {
      // Then, attempt to update the user with an existing wixId
      const response = await request(apiUrl)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', token)
        .send({
          wixId: '113355',
        });

      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toBe('RecordAlreadyExistsException');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    let userId = null;

    beforeEach(async () => {
      const user = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      };

      const response = await request(apiUrl)
        .post('/auth/v1/register')
        .set('Authorization', token)
        .send(user);

      userId = response.body.user ? response.body.user.id : null;
    });

    afterEach(async () => {
      if (userId) {
        await request(apiUrl)
          .delete(`/api/v1/users/${userId}`)
          .set('Authorization', token);
        userId = null;
      }
    });

    test('Get a user', async () => {
      const response = await request(apiUrl)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', token);

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toHaveProperty('id', userId);
      // Add other assertions here...
    });

    test('Fail getting a non-existent user', async () => {
      const response = await request(apiUrl)
        .get(`/api/v1/users/nonExistentId`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      // Check the specific error message depending on your implementation
    });
  });

  describe('GET /api/v1/users/list', () => {
    test('List all users', async () => {
      const response = await request(apiUrl)
        .get('/api/v1/users/list')
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeDefined();
      expect(Array.isArray(response.body.users)).toBe(true);
      // Add other assertions here...
    });
  });

  describe('GET /api/v1/users/me', () => {
    test('Get logged in user', async () => {
      const response = await request(apiUrl)
        .get('/api/v1/users/me')
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    test('Fail getting logged in user without token', async () => {
      const response = await request(apiUrl)
        .get('/api/v1/users/me');

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBeDefined();
      // expect(response.statusCode).toBe(403); /// antes tinha funcionado com 403 - possivel diferença de responta do offline
    });
  });

  describe('DELETE /api/v1/users/:id', () => {

    test('Successful user deletion', async () => {
      let userId = null;

      const registerUser = await request(apiUrl)
        .post('/auth/v1/register')
        .send({
          email: 'test@test.com',
          password: 'password',
          firstName: 'Test',
          lastName: 'User',
        });

      userId = registerUser.body.user !== undefined 
        ? registerUser.body.user.id : null;
      
      const response = await request(apiUrl)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', token);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('success');

      // Verify if user was actually deleted
      const verifyResponse = await request(apiUrl)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', token);
        
      expect(verifyResponse.statusCode).toBe(404);
    });

    test('Fail deletion with non-existent user', async () => {
      const response = await request(apiUrl)
        .delete('/api/v1/users/123456789')
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });
});
