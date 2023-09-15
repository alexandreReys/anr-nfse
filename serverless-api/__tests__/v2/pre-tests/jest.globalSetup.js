require('dotenv').config({ path: `./__tests__/v2/env/.env.${process.env.ENV.trim()}` });

process.env.API_URL = process.env.API_BASEURL

const request = require('supertest');
const apiUrl = process.env.API_URL;
const shared = require('../shared');

module.exports = async () => {
  await removeUserTests();

  const response = await request(apiUrl)
    .post('/auth/v2/register')
    .send({
      email: 'admin@test.com',
      password: 'test',
      firstName: 'Test',
      lastName: 'User',
      role: 'ADMIN',
    });

  if (response.statusCode === 200) {
    process.env.TOKEN = response.body.token;
    process.env.USERID = response.body.user.info.id;
  } else {
    console.log('');
    console.log('='.repeat(100));
    console.log('Error when trying to get Admin Token (GlobalSetup)');
    console.log(response.body.error);
    console.log('');
    console.log('');

    process.exit(1);
    return;
  }
};

async function removeUserTests() {
  const response = await request(apiUrl)
    .post('/auth/v2/login')
    .send({
      email: 'admin@test.com',
      password: 'test',
    });

  if (response.statusCode !== 200) {
    return;
  }

  let userToken = response.body.token;
  let userId    = response.body.user.info.id;

  await request(apiUrl)
    .delete(`/api/v2/users/${userId}`)
    .set('Authorization', userToken);
}
