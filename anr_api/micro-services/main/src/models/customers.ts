import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const tableName = 'customers'

class ICustomer extends Item {
  organizationId: String;
  id: String;
  name: String;
  stateRegistration: String;
  nationalRegistration: String;
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

const CustomersSchema = new dynamoose.Schema(
  {
    organizationId: {
      type: String,
      hashKey: true,
    },
    id: {
      type: String,
      rangeKey: true,
      default: () => {
        const uuid = uuidv4();
        // console.log(`Gerando novo UUID: ${uuid}`);
        return uuid;
      },
    },
    name: {
      type: String,
      required: true,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-name-gsi`,
      },
    },
    stateRegistration: {
      type: String,
      default: '',
    },
    nationalRegistration: {
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
export default dynamoose.model<ICustomer>(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  CustomersSchema,
  {
    create: false,
    waitForActive: false,
  }
);
