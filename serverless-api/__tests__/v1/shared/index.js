const request = require('supertest');

exports.expectedErrors = ["Unauthorized", undefined];
exports.expectedMessages = ["Unauthorized", "User is not authorized to access this resource"];

exports.removeTests = async function (module, apiUrl, token) {
  const response = await request(apiUrl)
    .get(`/api/v1/${module}/remove-tests`)
    .set('Authorization', token)
  ;
  expect(response.body.error).toBeUndefined();
  expect(response.statusCode).toBe(200);
}

/////////////////////////////////////////////////////////////////////////
const eventData = {
  name: 'Automatic Unit Test',
  startDate: 1680375609000,
  endDate: 1680375609000,
  minAge: 18,
  private: false
};
exports.eventData = eventData;

exports.event_beforeEach = async function (apiUrl, token) {
  const response = await request(apiUrl)
    .post('/api/v1/events')
    .set('Authorization', token)
    .send(eventData)
  ;

  expect(response.body.error).toBeUndefined();
  expect(response.statusCode).toBe(200);

  return response.body.event.id;
}

exports.event_afterEach = async function (eventId, apiUrl, token) {
  if (eventId) {
    const response = await request(apiUrl)
      .delete(`/api/v1/events/${eventId}`)
      .set('Authorization', token)
    ;
    expect(response.body.error).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }
  return null;
}

/////////////////////////////////////////////////////////////////////////
const worldData = {
  name: 'Automatic Unit Test',
  startDate: 1672542000000,
  endDate: 1672542000000,
  minAge: 18,
  private: false
};
exports.worldData = worldData;


exports.world_beforeEach = async function (eventId, apiUrl, token) {
  const payload = worldData;
  payload.eventId = eventId;

  const response = await request(apiUrl)
    .post('/api/v1/worlds')
    .set('Authorization', token)
    .send(payload)
  ;
  expect(response.body.error).toBeUndefined();
  expect(response.statusCode).toBe(200);

  return response.body.world.id;
}

exports.world_afterEach = async function (worldId, apiUrl, token) {
  if (worldId) {
    const response = await request(apiUrl)
      .delete(`/api/v1/worlds/${worldId}`)
      .set('Authorization', token)
    ;
    expect(response.body.error).toBeUndefined();
    expect(response.statusCode).toBe(200);
  }
  return null;
}

/////////////////////////////////////////////////////////////////////////
const guestData = {
  confirmed: 111,
  role: 'Automatic Unit Test',
  eventId: '1111111111',
  userId: '1111111111',
  worldId: '1111111111',
};
exports.guestData = guestData;

exports.guest_beforeEach = async function (apiUrl, token) {
  const response = await request(apiUrl)
    .post('/api/v1/guests')
    .set('Authorization', token)
    .send(guestData)
  ;
  expect(response.body.error).toBeUndefined();
  expect(response.statusCode).toBe(200);

  return response.body.guest.id;
}

exports.guest_afterEach = async function (id, apiUrl, token) {
  if (id) {
    const response = await request(apiUrl)
      .delete(`/api/v1/guests/${id}`)
      .set('Authorization', token)
    ;
    expect(response.body.error).toBeUndefined();
    expect(response.statusCode).toBe(200);
  };
  return null;
}

/////////////////////////////////////////////////////////////////////////
const propData = {
  "name": "Test Props",
  "assetUrl": "https://example.com/test.gltf",
  "mediaType": "GLTF",
  "position": [0,0,0],
  "previewImage": "https://example.com/test.png",
  "rotation": [0,0,0],
  "size": [1,1,1],
  "ueIdentifier": "Automatic Unit Test",
  "worldId": "111111111"
};
exports.propData = propData;

exports.prop_beforeEach = async function (apiUrl, token) {
  const response = await request(apiUrl)
    .post('/api/v1/props')
    .set('Authorization', token)
    .send(propData)
  ;
  expect(response.body.error).toBeUndefined();
  expect(response.statusCode).toBe(200);

  return response.body.prop.id;
}

exports.prop_afterEach = async function (id, apiUrl, token) {
  if (id) {
    const response = await request(apiUrl)
      .delete(`/api/v1/props/${id}`)
      .set('Authorization', token)
    ;
    expect(response.body.error).toBeUndefined();
    expect(response.statusCode).toBe(200);
  };
  return null;
}

/////////////////////////////////////////////////////////////////////////
exports.createWorld = async function (eventId, apiUrl, token) {
  const payload = {
    eventId,
    name: 'Automatic Unit Test',
    startDate: 1672542000000,
    endDate: 1672542000000,
    minAge: 18,
    private: false
  };
  const response = await request(apiUrl)
    .post('/api/v1/worlds')
    .set('Authorization', token)
    .send(payload)
  ;
  return response;
}

exports.deleteWorld = async function (worldId, apiUrl, token) {
  const response = await request(apiUrl)
    .delete(`/api/v1/worlds/${worldId}`)
    .set('Authorization', token)
  ;
  return response;
}

/////////////////////////////////////////////////////////////////////////
exports.createGuest = async function (eventId, userId, apiUrl, token) {
  const payload = {
    eventId,
    userId,
    confirmed: 0,
    role: 'Automatic Unit Test',
    worldId: '11111111111'
  };
  const response = await request(apiUrl)
    .post('/api/v1/guests')
    .set('Authorization', token)
    .send(payload)
  ;
  return response;
}

exports.deleteGuest = async function (guestId, apiUrl, token) {
  const response = await request(apiUrl)
    .delete(`/api/v1/guests/${guestId}`)
    .set('Authorization', token)
  ;
  return response;
}

/////////////////////////////////////////////////////////////////////////
exports.createUser = async function (apiUrl, token) {
  const payload = {
    email: 'test@test.com',
    password:'test',
    wixId: '123456789',
    firstName: 'Test',
    lastName: 'Test',
  };
  const response = await request(apiUrl)
    .post('/auth/v1/register')
    .set('Authorization', token)
    .send(payload)
  ;
  return response;
}

exports.deleteUser = async function (userId, apiUrl, token) {
  const response = await request(apiUrl)
    .delete(`/api/v1/users/${userId}`)
    .set('Authorization', token)
  ;
  return response;
}
/////////////////////////////////////////////////////////////////////////
