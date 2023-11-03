import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const tableName = 'services'

class IService extends Item {
  organizationId: String;
  id: String;
  description: String;
  price: Number;
  additionalRemarks: String;
}

const ServicesSchema = new dynamoose.Schema(
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
    description: {
      type: String,
      required: true,
      index: {
        name: `${process.env.PROJECT_ENVIRONMENT}-${tableName}-description-gsi`,
      },
    },
    price: {
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
export default dynamoose.model<IService>(
  `${process.env.PROJECT_ENVIRONMENT}-${tableName}`,
  ServicesSchema,
  {
    create: false,
    waitForActive: false,
  }
);
