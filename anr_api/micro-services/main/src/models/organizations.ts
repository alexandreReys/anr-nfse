import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const defaultData = require('../utils/default-data');
const tableName = 'organizations'

class IOrganizations extends Item {
  id: String;
  nationalRegistration: String;
  name: String;
  stateRegistration: String;
  zipCode: String;
  street: String;
  number: String;
  district: String;
  complement: String;
  city: String;
  state: String;
  phoneNumber: String;
  email: String;
  additionalRemarks: String;
};

const OrganizationsSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv4(),
    },
    nationalRegistration: {
      type: String,
      required: true,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-nationalRegistration-gsi`,
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
export default dynamoose.model<IOrganizations>(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  OrganizationsSchema,
  {
    create: false,
    waitForActive: false,
  }
);
