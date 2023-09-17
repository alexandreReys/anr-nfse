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
