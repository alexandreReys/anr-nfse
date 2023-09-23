const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'users'

const UsersSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      global: true,
      default: uuid.v4,
    },
    email: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-email-gsi`,
        global: true,
        default: '',
      },
    },
    password: {
      type: String,
      default: '',
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    profileImgUrl: {
      type: String,
      default: defaultData.getDefaultImage,
    },
    role: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = dynamoose.model(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  UsersSchema,
  {
    create: false,
    waitForActive: false,
  }
);
