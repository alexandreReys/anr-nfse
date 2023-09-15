const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'guests'

const GuestsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      global: true,
      default: uuid.v4,
    },
    eventId: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-eventId-gsi`,
        global: true,
        default: '',
      },
    },
    worldId: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-worldId-gsi`,
        global: true,
        default: '',
      },
    },
    userId: {
      type: String,
      default: '',
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-userId-gsi`,
        global: true,
        default: '',
      },
    },
    confirmed: {
      type: Number,
      default: 0,
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
  GuestsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
