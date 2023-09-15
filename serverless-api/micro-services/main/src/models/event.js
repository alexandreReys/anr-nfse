const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'events'

const EventsSchema = new dynamoose.Schema(
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
    owner: {
      type: String,
      required: true,
    },
    defaultWorld: {
      type: String,
      default: '',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = dynamoose.model(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  EventsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
