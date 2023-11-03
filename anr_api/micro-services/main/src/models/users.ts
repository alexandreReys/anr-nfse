import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const defaultData = require('../utils/default-data');
const tableName = 'users'

class IUser extends Item {
  organizationId: String;
  id: String;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  profileImgUrl: String;
  role: String;
};

const UsersSchema = new dynamoose.Schema(
  {
    organizationId: {
      type: String,
      hashKey: true,
    },
    id: {
      type: String,
      rangeKey: true,
      default: uuidv4(),
    },
    email: {
      type: String,
      default: '',
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-email-gsi`,
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
export default dynamoose.model<IUser>(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  UsersSchema,
  {
    create: false,
    waitForActive: false,
  }
);
