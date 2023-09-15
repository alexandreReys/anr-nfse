const request = require('supertest');
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const shared = require('./shared');

describe('PROPS TESTS', () => {

  beforeAll(async () => {
    await shared.removeTests('props', apiUrl, token);
  });

  afterAll(async () => {
    await shared.removeTests('props', apiUrl, token);
  });

  describe('POST /api/v1/props', () => {
    let propId = null;

    afterEach(async () => {
      propId = await shared.prop_afterEach(propId, apiUrl, token);
    });

    test('Successful prop creation', async () => {
      const prop = { ...shared.propData };
      
      const response = await request(apiUrl)
        .post('/api/v1/props')
        .set('Authorization', token)
        .send(prop)
      ;
      if (response.statusCode === 200) propId = response.body.prop.id;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.prop).toBeDefined();
      expect(response.body.prop.name).toBe(prop.name);
    });

    test('Prop creation fail without token', async () => {
      const prop = { ...shared.propData };

      const response = await request(apiUrl)
        .post('/api/v1/props')
        .send(prop)
      ;
      if (response.statusCode === 200) propId = response.body.prop.id;

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v1/props/:id', () => {
    let propId = null;

    beforeEach(async () => {
      propId = await shared.prop_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      propId = await shared.prop_afterEach(propId, apiUrl, token);
    });

    test('Successful prop update', async () => {
      const prop = { ...shared.propData };
      
      const response = await request(apiUrl)
        .put(`/api/v1/props/${propId}`)
        .set('Authorization', token)
        .send(prop)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.prop).toBeDefined();
      expect(response.body.prop.name).toBe(prop.name);
    });

    test('Prop update fail without token', async () => {
      const prop = { ...shared.propData };

      const response = await request(apiUrl)
        .put(`/api/v1/props/${propId}`)
        .send(prop)
      ;
      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Prop update fail with non-existing id', async () => {
      const prop = { ...shared.propData };

      const response = await request(apiUrl)
        .put(`/api/v1/props/999999999`)
        .set('Authorization', token)
        .send(prop)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('DELETE /api/v1/props/:id', () => {
    let propId = null;

    beforeEach(async () => {
      propId = await shared.prop_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      propId = await shared.prop_afterEach(propId, apiUrl, token);
    });
    
    test('Successful prop delete', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v1/props/${propId}`)
        .set('Authorization', token)
      ;
      if (response.statusCode === 200) propId = null;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('success');
    });

    test('Prop delet fail without token', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v1/props/${propId}`);

      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Prop delete fail with non-existing id', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v1/props/999999999`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('GET /api/v1/props/list', () => {
    test('List all props', async () => {
      const response = await request(apiUrl)
        .get('/api/v1/props/list')
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.props).toBeDefined();
    });
  });

  describe('GET /api/v1/props/:id', () => {
    let propId = null;

    beforeEach(async () => {
      propId = await shared.prop_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      propId = await shared.prop_afterEach(propId, apiUrl, token);
    });
    
    test('Get prop by id', async () => {
      const response = await request(apiUrl)
        .get(`/api/v1/props/${propId}`)
        .set('Authorization', token)
      ;
      
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.prop).toBeDefined();
    });

    test('Get non-existing prop by id', async () => {
      const response = await request(apiUrl)
        .get('/api/v1/props/999999999')
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });
});
