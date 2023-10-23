import { z } from 'zod';

export const schemaForm = z.object({
  user: z.object({
    organizationId: z.string(),
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    role: z.string(),
    profileImgUrl: z.string(),
  })
}).transform((field) => ({
  user: {
    organizationId: field.user.organizationId,
    id: field.user.id,
    email: field.user.email,
    firstName: field.user.firstName,
    lastName: field.user.lastName,
    password: field.user.password,
    role: field.user.role,
    profileImgUrl: field.user.profileImgUrl,
  }
}));
