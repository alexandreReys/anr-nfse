require('dotenv').config({ path: `./__tests__/v1/env/.env.${process.env.ENV.trim()}` });

process.env.API_URL = process.env.API_BASEURL

const request = require('supertest');
const apiUrl = process.env.API_URL;
const shared = require('../shared');

module.exports = async () => {
  await removeUserTests();

  const response = await request(apiUrl)
    .post('/auth/v1/register')
    .send({
      email: 'admin@test.com',
      password: 'test',
      firstName: 'Test',
      lastName: 'User',
      role: 'ADMIN',
    });

  if (response.statusCode === 200) {
    process.env.TOKEN = response.body.token;
    process.env.USERID = response.body.user.id;
  } else {
    process.env.TOKEN = '';
    process.env.USERID = '';
  }
};

async function removeUserTests() {
  const response = await request(apiUrl)
    .post('/auth/v1/login')
    .send({
      email: 'admin@test.com',
      password: 'test',
    });

  if (response.statusCode !== 200) return;

  let userToken = response.body.token;
  let userId    = response.body.user.id;

  await request(apiUrl)
    .delete(`/api/v1/users/${userId}`)
    .set('Authorization', userToken);
}
