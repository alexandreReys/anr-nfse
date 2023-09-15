const request = require('supertest');
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;
const shared = require('./shared');

describe('GUESTS TESTS', () => {

  beforeAll(async () => {
    await shared.removeTests('guests', apiUrl, token);
  });
  
  afterAll(async () => {
    await shared.removeTests('guests', apiUrl, token);
  });

  describe('POST /api/v2/guests', () => {
    let guestId = null;

    afterEach(async () => {
      guestId = await shared.guest_afterEach(guestId, apiUrl, token);
    });

    test('Successful guest creation', async () => {
      const guest = { ...shared.guestData };
      
      const response = await request(apiUrl)
        .post('/api/v2/guests')
        .set('Authorization', token)
        .send(guest)
      ;
      if (response.statusCode === 200) guestId = response.body.guest.info.id;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.guest).toBeDefined();
      expect(response.body.guest.info.name).toBe(guest.name);
    });

    test('Guest creation fail without token', async () => {
      const guest = { ...shared.guestData };

      const response = await request(apiUrl)
        .post('/api/v2/guests')
        .send(guest)
      ;
      if (response.statusCode === 200) guestId = response.body.guest.info.id;

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v2/guests/:id', () => {
    let guestId = null;

    beforeEach(async () => {
      guestId = await shared.guest_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      guestId = await shared.guest_afterEach(guestId, apiUrl, token);
    });

    test('Successful guest update', async () => {
      const guest = { ...shared.guestData };
      
      const response = await request(apiUrl)
        .put(`/api/v2/guests/${guestId}`)
        .set('Authorization', token)
        .send(guest)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.guest).toBeDefined();
      expect(response.body.guest.info.name).toBe(guest.name);
    });

    test('Guest update fail without token', async () => {
      const guest = { ...shared.guestData };

      const response = await request(apiUrl)
        .put(`/api/v2/guests/${guestId}`)
        .send(guest)
      ;
      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Guest update fail with non-existing id', async () => {
      const guest = { ...shared.guestData };

      const response = await request(apiUrl)
        .put(`/api/v2/guests/999999999`)
        .set('Authorization', token)
        .send(guest)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('DELETE /api/v2/guests/:id', () => {
    let guestId = null;

    beforeEach(async () => {
      guestId = await shared.guest_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      guestId = await shared.guest_afterEach(guestId, apiUrl, token);
    });
    
    test('Successful guest delete', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/guests/${guestId}`)
        .set('Authorization', token)
      ;
      if (response.statusCode === 200) guestId = null;

      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('success');
    });

    test('Guest delet fail without token', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/guests/${guestId}`);

      const responseObj = JSON.parse(response.text);

      expect(response.statusCode).toBe(401);
      expect(shared.expectedErrors).toEqual(expect.arrayContaining([responseObj.error]));
      expect(shared.expectedMessages).toEqual(expect.arrayContaining([responseObj.message]));
    });

    test('Guest delete fail with non-existing id', async () => {
      const response = await request(apiUrl)
        .delete(`/api/v2/guests/999999999`)
        .set('Authorization', token)
      ;
      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });

  describe('GET /api/v2/guests/list', () => {
    test('List all guests', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/guests/list')
        .set('Authorization', token)
      ;
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.guests).toBeDefined();
    });
  });

  describe('GET /api/v2/guests/:id', () => {
    let guestId = null;

    beforeEach(async () => {
      guestId = await shared.guest_beforeEach(apiUrl, token);
    });

    afterEach(async () => {
      guestId = await shared.guest_afterEach(guestId, apiUrl, token);
    });
    
    test('Get guest by id', async () => {
      const response = await request(apiUrl)
        .get(`/api/v2/guests/${guestId}`)
        .set('Authorization', token)
      ;
      
      expect(response.body.error).toBeUndefined();
      expect(response.statusCode).toBe(200);
      expect(response.body.guest).toBeDefined();
    });

    test('Get non-existing guest by id', async () => {
      const response = await request(apiUrl)
        .get('/api/v2/guests/999999999')
        .set('Authorization', token);

      expect(response.statusCode).toBe(404);
      expect(response.body.error.message).toBe('RecordNotExistException');
    });
  });
});
