import { z } from 'zod';

export const schemaForm = z.object({
  customer: z.object({
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
  customer: {
    organizationId: field.customer.organizationId,
    id: field.customer.id,
    name: field.customer.name,
    stateRegistration: field.customer.stateRegistration,
    nationalRegistration: field.customer.nationalRegistration,
    zipCode: field.customer.zipCode,
    street: field.customer.street,
    number: field.customer.number,
    district: field.customer.district,
    complement: field.customer.complement,
    city: field.customer.city,
    state: field.customer.state,
    phoneNumber: field.customer.phoneNumber,
    email: field.customer.email,
    additionalRemarks: field.customer.additionalRemarks,
  }
}));
