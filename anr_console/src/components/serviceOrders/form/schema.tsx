import { z } from 'zod';

export const schemaForm = z.object({
  serviceOrder: z.object({
    id: z.string(),
    organizationId: z.string(),
    description: z.string().min(2, 'Informe a Descrição do Serviço'),
    customerId: z.string(),
    total: z.number(),
    additionalRemarks: z.string(),
  })
}).transform((field) => ({
  serviceOrder: {
    id: field.serviceOrder.id,
    organizationId: field.serviceOrder.organizationId,
    description: field.serviceOrder.description,
    customerId: field.serviceOrder.customerId,
    total: field.serviceOrder.total,
    additionalRemarks: field.serviceOrder.additionalRemarks,
  }
}));

