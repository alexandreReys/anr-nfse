import { z } from 'zod';

export const schemaForm = z.object({
  service: z.object({
    organizationId: z.string(),
    id: z.string(),
    description: z.string().min(2, 'Informe a Descrição'),
    price: z.union([
      z.string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value >= 0, {
          message: "Preço deve ser um número válido e não negativo",
        }),
      z.number()
        .nonnegative("Preço deve ser um número não negativo")
    ]),

    additionalRemarks: z.string(),
  })
}).transform((field) => ({
  service: {
    organizationId: field.service.organizationId,
    id: field.service.id,
    description: field.service.description,
    price: field.service.price,
    additionalRemarks: field.service.additionalRemarks,
  }
}));
