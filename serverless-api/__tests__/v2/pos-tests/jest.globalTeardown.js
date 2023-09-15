
const request = require('supertest');

module.exports = async () => {
  await removeUserTests();
};

async function removeUserTests() {
  const apiUrl = process.env.API_URL;
  const token  = process.env.TOKEN;
  const userId = process.env.USERID;

  await request(apiUrl)
    .delete(`/api/v2/users/${userId}`)
    .set('Authorization', token);
}
