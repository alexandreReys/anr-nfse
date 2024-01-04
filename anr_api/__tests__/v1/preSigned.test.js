const fs = require('fs');
const axios = require('axios');
const request = require('supertest');
const apiUrl = process.env.API_URL;
const shared = require('./shared');
let token = process.env.TOKEN;

// process.env.AWS_PROFILE = 'anr'; 
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

describe('POST /generatePreSignedUrl', () => {
  test('Successful presigned url', async () => {
    const body = {
      filename: 'peq.png'
    }
    
    const response = await request(apiUrl)
      .post('/generatePreSignedUrl')
      .set('Authorization', token)
      .send(body)
    ;
    expect(response.body.error).toBeUndefined();
    expect(response.statusCode).toBe(200);
    expect(response.body['url-image']).toBeDefined();
    expect(response.body['url-thumbnail']).toBeDefined();

    // read the file
    const fileData = fs.readFileSync('./__tests__/v1/images/test.jpg');
        
    // upload the file
    const uploadResponse = await axios.put(response.body['url-image'], fileData, {
      headers: {
        'Content-Type': 'image/png',
      }
    });

    expect(uploadResponse.status).toBe(200); // verify upload was successful

    const url = new URL(response.body['url-image']);
    const bucket = 'assets.cms.dev.anrsistemas.com';
    const key = url.pathname.substring(1);

    const deleteParams = {Bucket: bucket, Key: key};
    const deleteResponse = await s3.deleteObject(deleteParams).promise();
    expect(deleteResponse).toBeDefined();
  });
});

