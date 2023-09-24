import { z } from 'zod';

export const schemaForm = z.object({
  user: z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    role: z.string(),
    profileImgUrl: z.string(),
  })
}).transform((field) => ({
  user: {
    email: field.user.email,
    firstName: field.user.firstName,
    lastName: field.user.lastName,
    password: field.user.password,
    role: field.user.role,
    profileImgUrl: field.user.profileImgUrl,
  }
}));
