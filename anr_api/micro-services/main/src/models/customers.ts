import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item'
import { v4 as uuidv4 } from 'uuid';
const tableName = 'customers'

class ICustomer extends Item {
  organizationId: String;
  id: String;
  name: String;
  additionalRemarks: String;
}

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
