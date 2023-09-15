const request = require('supertest');
const apiUrl = process.env.API_URL;
let token = process.env.TOKEN;
const shared = require('./shared');

describe('EVENTS TESTS', () => {

  beforeAll(async () => {
    await shared.removeTests('users', apiUrl, token);
    await shared.removeTests('events', apiUrl, token);
    await shared.removeTests('worlds', apiUrl, token);
  });

  afterAll(async () => {
    await shared.removeTests('users', apiUrl, token);
    await shared.removeTests('events', apiUrl, token);
    await shared.removeTests('worlds', apiUrl, token);
  });

  describe('POST /api/v2/events', () => {
    let eventId = null;

    afterEach(async () => {
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Successful event creation', async () => {
      const event = { ...shared.eventData };
      
      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.event).toBeDefined();
      expect(response.body.event.info.name).toBe(event.name);
    });

    test('Event creation fail with missing name', async () => {
      const event = { ...shared.eventData };
      delete event.name;

      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(403);
    });

    test('Event creation fail with missing startDate', async () => {
      const event = { ...shared.eventData };
      delete event.startDate;

      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(403);
    });

    test('Event creation fail with missing endDate', async () => {
      const event = { ...shared.eventData };
      delete event.endDate;

      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(403);
    });

    test('Event creation fail with missing minAge', async () => {
      const event = { ...shared.eventData };
      delete event.minAge;

      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(403);
    });

    test('Event creation fail with missing private', async () => {
      const event = { ...shared.eventData };
      delete event.private;

      const response = await request(apiUrl)
        .post('/api/v2/events')
        .set('Authorization', token)
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(403);
    });

    test('Event creation fail without token', async () => {
      const event = { ...shared.eventData };
      
      const response = await request(apiUrl)
        .post('/api/v2/events')
        .send(event)
      ;
      if (response.statusCode === 200) eventId = response.body.event.info.id;
      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v2/events/:id', () => {
    let eventId;
    
    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Successful event update', async () => {
      const event = { ...shared.eventData };
      
      const response = await request(apiUrl)
        .put(`/api/v2/events/${eventId}`)
        .set('Authorization', token)
        .send(event)
      ;
      expect(response.statusCode).toBe(200);
      expect(response.body.event).toBeDefined();
      expect(response.body.event.info.name).toBe(event.name);
    });

    test('Event update fail without token', async () => {
      const event = { ...shared.eventData };

      const response = await request(apiUrl)
        .put(`/api/v2/events/${eventId}`)
        .send(event)
      ;
      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Event update fail with non-existing id', async () => {
      const event = { ...shared.eventData };

      const response = await request(apiUrl)
        .put(`/api/v2/events/999999999`)
        .set('Authorization', token)
        .send(event)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('DELETE /api/v2/events/:id', () => {
    const shared = require('./shared')
    let eventId;
    
    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Successful event delete', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/events/${eventId}`)
        .set('Authorization', token)
      ;
      if (response.statusCode === 200) eventId = null;

      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBeUndefined();
      expect(response.body.message).toBe('success');
    });

    test('Event delet fail without token', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/events/${eventId}`);

      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Event delete fail with non-existing id', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/events/999999999`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });

    test('Event deletion failed because it has world', async () => {
      const responseWorld = await shared.createWorld(eventId, apiUrl, token);
      expect(responseWorld.body.error).toBeUndefined();
      expect(responseWorld.statusCode).toBe(200);

      const response = await request(apiUrl)
        .delete(`/api/v2/events/${eventId}`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toBe('Event has Worlds');
      
      const responseDeleteWorld = await shared.deleteWorld(responseWorld.body.world.info.id, apiUrl, token);
      expect(responseDeleteWorld.body.error).toBeUndefined();
      expect(responseDeleteWorld.statusCode).toBe(200);
    });

    test('Event deletion failed because it has guest', async () => {
      const responseGuest = await shared.createGuest(eventId, '111111111', apiUrl, token);
      expect(responseGuest.statusCode).toBe(200);

      const response = await request(apiUrl)
        .delete(`/api/v2/events/${eventId}`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(403);
      expect(response.body.error.message).toBe('Event has Guests');
      
      const responseDeleteGuest = await shared.deleteGuest(responseGuest.body.guest.info.id, apiUrl, token);
      expect(responseDeleteGuest.statusCode).toBe(200);
    });
  });

  describe('GET /api/v2/events/list', () => {
    test('List all events', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/events/list')
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.events).toBeDefined();
    });
  });

  describe('GET /api/v2/events/subscribed/:userId', () => {
    test('Get all subscribed events by userId', async () => {
      const userId = shared.userId;
      const response = await request(apiUrl)
        .get(`/api/v2/events/subscribed/${userId}`)
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.events).toBeDefined();
    });
  });

  describe('GET /api/v2/events/:id', () => {
    test('Get event by id', async () => {
      let eventId = await shared.event_beforeEach(apiUrl, token);

      const response = await request(apiUrl)
        .get(`/api/v2/events/${eventId}`)
        .set('Authorization', token)
      ;
      
      await shared.event_afterEach(eventId, apiUrl, token);

      expect(response.statusCode).toBe(200);
      expect(response.body.event).toBeDefined();
    });

    test('Get non-existing event by id', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/events/999999999')
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('GET /api/v2/events/user-in-event/:eventId', () => {
    let eventId = '';

    beforeEach(async () => {
      eventId = await shared.event_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      eventId = await shared.event_afterEach(eventId, apiUrl, token);
    });

    test('Check if user is in event', async () => {
      const responseUser = await shared.createUser(apiUrl, token);
      expect(responseUser.body.error).toBeUndefined();
      expect(responseUser.statusCode).toBe(200);
      
      const userId = responseUser.body.user.info.id;
      token = responseUser.body.token;

      const responseGuest = await shared.createGuest(eventId, userId, apiUrl, token);
      expect(responseGuest.body.error).toBeUndefined();
      expect(responseGuest.statusCode).toBe(200);

      const guestId = responseGuest.body.guest.info.id;

      /////

      const response = await request(apiUrl)
        .get(`/api/v2/events/user-in-event/${eventId}`)
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);

      expect(response.body.userInEvent).toBe(true);

      /////

      const responseUserDelete = await shared.deleteUser(userId, apiUrl, token);
      expect(responseUserDelete.body.error).toBeUndefined();
      expect(responseUserDelete.statusCode).toBe(200);

      const responseDeleteGuest = await shared.deleteGuest(guestId, apiUrl, token);
      expect(responseDeleteGuest.body.error).toBeUndefined();
      expect(responseDeleteGuest.statusCode).toBe(200);
    });
  });
});
