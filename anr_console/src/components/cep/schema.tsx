import { string, z } from 'zod';

export const schemaForm = z.object({
  address: z.object({
    zipCode: z.string().min(9, 'Informe o Cep'),
    street: z.string().min(1, 'Informe a Rua'),
    number: z.string().min(1, 'Informe o Numero'),
    district: z.string().min(1, 'Informe o Bairro'),
    complement: z.string(),
    city: z.string().min(1, 'Informe a Cidade'),
    state: z.string().min(1, 'Informe o Estado'),
  })
}).transform((field) => ({
  address: {
    zipCode: field.address.zipCode,
    street: field.address.street,
    number: field.address.number,
    district: field.address.district,
    complement: field.address.complement,
    city: field.address.city,
    state: field.address.state,
  }
}));

