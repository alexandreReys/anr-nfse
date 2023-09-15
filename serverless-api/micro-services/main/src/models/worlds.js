const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'worlds'

const WorldsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      global: true,
      default: uuid.v4,
    },
    name: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-name-gsi`,
        global: true,
        default: '',
      },
    },
    eventId: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-eventId-gsi`,
        global: true,
        default: '',
      },
    },
    friendlyId: {
      type: String,
      default: '',
    },
    startDate: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: Number,
      default: 0,
    },
    minAge: {
      type: Number,
      default: 0,
    },
    private: {
      type: Boolean,
      default: true,
    },
    level: {
      type: String,
      default: '',
    },
    slot: {
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
  WorldsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
