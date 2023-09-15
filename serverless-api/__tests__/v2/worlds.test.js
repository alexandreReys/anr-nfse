const request = require('supertest');
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const shared = require('./shared');

describe('WORLDS TESTS', () => {

  beforeAll(async () => {
    await shared.removeTests('worlds', apiUrl, token);
    await shared.removeTests('events', apiUrl, token);
  });

  afterAll(async () => {
    await shared.removeTests('worlds', apiUrl, token);
    await shared.removeTests('events', apiUrl, token);
  });

  describe('POST /api/v2/worlds', () => {
    let eventId = null;
    let worldId = null;

    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      worldId = await shared.world_afterEach(worldId, apiUrl, token);
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Successful world creation', async () => {
      const world = { ...shared.worldData };
      world.eventId = eventId;
      
      const response = await request(apiUrl)
        .post('/api/v2/worlds')
        .set('Authorization', token)
        .send(world)
      ;
      if (response.statusCode === 200) worldId = response.body.world.info.id;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.world).toBeDefined();
      expect(response.body.world.info.name).toBe(world.name);
    });

    test('World creation fail without token', async () => {
      const world = { ...shared.worldData };
      world.eventId = eventId;

      const response = await request(apiUrl)
        .post('/api/v2/worlds')
        .send(world)
      ;
      if (response.statusCode === 200) worldId = response.body.world.info.id;

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v2/worlds/:id', () => {
    let eventId = null;
    let worldId = null;

    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
      worldId = await shared.world_beforeEach(eventId, apiUrl, token);
    });

    afterEach(async () => {
      worldId = await shared.world_afterEach(worldId, apiUrl, token);
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Successful world update', async () => {
      const world = { ...shared.worldData };
      
      const response = await request(apiUrl)
        .put(`/api/v2/worlds/${worldId}`)
        .set('Authorization', token)
        .send(world)
      ;
      expect(response.statusCode).toBe(200);
      expect(response.body.world).toBeDefined();
      expect(response.body.world.info.name).toBe(world.name);
    });

    test('World update fail without token', async () => {
      const world = { ...shared.worldData };

      const response = await request(apiUrl)
        .put(`/api/v2/worlds/${worldId}`)
        .send(world)
      ;
      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('World update fail with non-existing id', async () => {
      const world = { ...shared.worldData };

      const response = await request(apiUrl)
        .put(`/api/v2/worlds/999999999`)
        .set('Authorization', token)
        .send(world)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('DELETE /api/v2/worlds/:id', () => {
    let eventId = null;
    let worldId = null;

    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
      worldId = await shared.world_beforeEach(eventId, apiUrl, token);
    });

    afterEach(async () => {
      worldId = await shared.world_afterEach(worldId, apiUrl, token);
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });
    
    test('Successful world delete', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/worlds/${worldId}`)
        .set('Authorization', token)
      ;
      if (response.statusCode === 200) worldId = null;

      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
      expect(response.body.message).toBe('success');
    });

    test('World delet fail without token', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/worlds/${worldId}`);

      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('World delete fail with non-existing id', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/worlds/999999999`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('GET /api/v2/worlds/list', () => {
    test('List all worlds', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/worlds/list')
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.worlds).toBeDefined();
    });
  });

  describe('GET /api/v2/worlds/:id', () => {
    let worldId = null;
    let eventId = null;

    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
      worldId = await shared.world_beforeEach(eventId, apiUrl, token);
    });

    afterEach(async () => {
      worldId = await shared.world_afterEach(worldId, apiUrl, token);
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });
    
    test('Get world by id', async () => {
      const response = await request(apiUrl)
        .get(`/api/v2/worlds/${worldId}`)
        .set('Authorization', token)
      ;
      
      expect(response.statusCode).toBe(200);
      expect(response.body.world).toBeDefined();
    });

    test('Get non-existing world by id', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/worlds/999999999')
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });
});
