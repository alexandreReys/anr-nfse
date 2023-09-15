const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'props'

const PropsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      global: true,
      default: uuid.v4,
    },
    worldId: {
      type: String,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-worldId-gsi`,
        global: true,
        default: '',
      },
    },
    ueIdentifier: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    previewImage: {
      type: String,
      default: '',
    },

    position: {
      type: Array,
      schema: [Number],
      default: [0, 0, 0],
    },
    rotation: {
      type: Array,
      schema: [Number],
      default: [0, 0, 0],
    },
    size: {
      type: Array,
      schema: [Number],
      default: [0, 0, 0],
    },
    assetUrl: {
      type: String,
      default: '',
    },
    mediaType: {
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
  PropsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
