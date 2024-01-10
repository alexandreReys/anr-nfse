import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const tableName = 'service-orders'

export class IServiceOrders extends Item {
  organizationId: String;
  id: String;
  description: String;
  customerId: String;
  serviceId: String;
  total: Number;
  additionalRemarks: String;
}

const ServiceOrdersSchema = new dynamoose.Schema(
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
        return uuid;
      },
    },
    description: {
      type: String,
      required: true,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-description-gsi`,
      },
    },
    customerId: {
      type: String,
      default: '',
    },
    serviceId: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
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
export default dynamoose.model<IServiceOrders>(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  ServiceOrdersSchema,
  {
    create: false,
    waitForActive: false,
  }
);
