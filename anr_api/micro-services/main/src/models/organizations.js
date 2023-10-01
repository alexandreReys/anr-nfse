const dynamoose = require('dynamoose');
const uuid = require('../utils/uuid');
const defaultData = require('../utils/default-data');
const tableName = 'organizations'

const OrganizationsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      global: true,
      default: uuid.v4,
    },
    nationalRegistration: {
      type: String,
      required: true,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-nationalRegistration-gsi`,
        global: true,
      },
    },
    name: {
      type: String,
      default: '',
    },
    stateRegistration: {
      type: String,
      default: '',
    },
    zipCode: {
      type: String,
      default: '',
    },
    street: {
      type: String,
      default: '',
    },
    number: {
      type: String,
      default: '',
    },
    district: {
      type: String,
      default: '',
    },
    complement: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    additionalRemarks: {
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
  OrganizationsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
