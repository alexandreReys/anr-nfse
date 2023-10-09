import { z } from 'zod';

export const schemaForm = z.object({
  organization: z.object({
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
  organization: {
    id: field.organization.id,
    name: field.organization.name,
    stateRegistration: field.organization.stateRegistration,
    nationalRegistration: field.organization.nationalRegistration,
    zipCode: field.organization.zipCode,
    street: field.organization.street,
    number: field.organization.number,
    district: field.organization.district,
    complement: field.organization.complement,
    city: field.organization.city,
    state: field.organization.state,
    phoneNumber: field.organization.phoneNumber,
    email: field.organization.email,
    additionalRemarks: field.organization.additionalRemarks,
  }
}));
