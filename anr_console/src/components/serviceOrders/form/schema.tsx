import { z } from 'zod';

export const schemaForm = z.object({
  serviceOrder: z.object({
    organizationId: z.string(),
    id: z.string(),
    name: z.string().min(2, 'Informe o Nome'),
    stateRegistration: z.string(),
    nationalRegistration: z.string().min(14, 'Informe o CNPJ'),
    zipCode: z.string(),
    street: z.string(),
    number: z.string(),
    district: z.string(),
    complement: z.string(),
    city: z.string(),
    state: z.string(),
    phoneNumber: z.string().min(8, 'Informe o Telefone'),
    email: z.string().min(8, 'Informe o Email'),
    additionalRemarks: z.string(),
  })
}).transform((field) => ({
  serviceOrder: {
    organizationId: field.serviceOrder.organizationId,
    id: field.serviceOrder.id,
    name: field.serviceOrder.name,
    stateRegistration: field.serviceOrder.stateRegistration,
    nationalRegistration: field.serviceOrder.nationalRegistration,
    zipCode: field.serviceOrder.zipCode,
    street: field.serviceOrder.street,
    number: field.serviceOrder.number,
    district: field.serviceOrder.district,
    complement: field.serviceOrder.complement,
    city: field.serviceOrder.city,
    state: field.serviceOrder.state,
    phoneNumber: field.serviceOrder.phoneNumber,
    email: field.serviceOrder.email,
    additionalRemarks: field.serviceOrder.additionalRemarks,
  }
}));
