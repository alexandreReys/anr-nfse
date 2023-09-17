const jwt = require('jsonwebtoken');
const defaultData = require('../utils/default-data');

exports.elapsedTimeInMinutes = function (intialTimestamp) {
  const now = new Date();
  const nowTimestamp = now.getTime();

  const timestamp1 = intialTimestamp;
  const timestamp2 = nowTimestamp;

  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  const diffInMs = date2 - date1;
  const diffInMinutes = parseInt( diffInMs / 60000 );

  return diffInMinutes;
};

exports.sendError = function (err, next, subject = '') {
  const msg = !subject ? 'ERROR: ' : subject.toUpperCase() + ' ERROR: ';
  console.log(msg + err.message);
  console.log(err);

  const error = new Error(err.message);
  error.status = err.status;
  error.code = err.code;
  next(error);
};

exports.getToken = function (payload) {
  return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
};

exports.normalizeImage = function (body, fieldName) {
  if (!(fieldName in body)) return;

  if (body[fieldName]) {
    body[fieldName] = body[fieldName].replace(
      'https://gathr-app-images.s3.amazonaws.com/placeholder-image.jpg',
      defaultData.getDefaultImage()
    );
    body[fieldName] = body[fieldName].replace(
      's3.sa-east-1.amazonaws.com/tf-',
      'tf-'
    );
  }
};

exports.checkRequiredFields = function (body, fields) {
  const { ErrorsMapped } = require('../config/errors-mapped');

  for (const field of fields) {
    if ( !(field in body)  || body[field] === '' ) {
      ErrorsMapped.Custom.message = `Field ${field} is required.`;
      return ErrorsMapped.Custom;
    }
  }
}

exports.normalizeField = function (body, fieldName, type) {
  if (!(fieldName in body)) return;

  if (type === 'boolean')
    body[fieldName] = body[fieldName] === 'true' || body[fieldName] === true;

  if (type === 'integer') body[fieldName] = parseInt(body[fieldName]);

  if (type === 'number') body[fieldName] = parseFloat(body[fieldName]);

  if (type === 'date') body[fieldName] = body[fieldName].as_millis();
};

exports.normalizeFields = function (body, fields) {
  for (const field of fields) {
    if (field.name in body) {
      if (field.type === 'boolean')
        body[field.name] = body[field.name] === 'true' || body[field.name] === true;

      if (field.type === 'integer') body[field.name] = parseInt(body[field.name]);

      if (field.type === 'number') body[field.name] = parseFloat(body[field.name]);

      if (field.type === 'date') body[field.name] = body[field.name].as_millis();
    }
  };
};

// eslint-disable-next-line no-extend-native
Number.prototype.as_millis = function (size = 13) {
  let timestamp = this.valueOf();
  if (typeof timestamp === 'number') timestamp = `${Math.abs(timestamp)}`;

  const diff = Math.abs(timestamp.length - size);

  for (let i = 0; i < diff; i++) timestamp = `${timestamp}0`;

  return parseInt(timestamp);
};

// eslint-disable-next-line no-extend-native
String.prototype.as_millis = function (size = 13) {
  let timestamp = this.valueOf();

  const diff = Math.abs(timestamp.length - size);

  for (let i = 0; i < diff; i++) timestamp = `${timestamp}0`;

  return parseInt(timestamp);
};

Date.as_millis = function () {
  return new Date().getTime().as_millis();
};
