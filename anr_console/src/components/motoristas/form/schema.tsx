import { z } from 'zod';

export const schemaForm = z.object({
  driver: z.object({
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string(),
    stateRegistration: z.string(),
    nationalRegistration: z.string(),
    zipCode: z.string(),
    street: z.string(),
    number: z.string(),
    district: z.string(),
    complement: z.string(),
    city: z.string(),
    state: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    category: z.string(),
    driversLicense: z.string(),
    validity: z.string(),
    firstDriversLicenseDate: z.string(),
    additionalRemarks: z.string(),
  })
}).transform((field) => ({
  driver: {
    firstName: field.driver.firstName,
    lastName: field.driver.lastName,
    birthDate: field.driver.birthDate,
    stateRegistration: field.driver.stateRegistration,
    nationalRegistration: field.driver.nationalRegistration,
    zipCode: field.driver.zipCode,
    street: field.driver.street,
    number: field.driver.number,
    district: field.driver.district,
    complement: field.driver.complement,
    city: field.driver.city,
    state: field.driver.state,
    phoneNumber: field.driver.phoneNumber,
    email: field.driver.email,
    category: field.driver.category,
    driversLicense: field.driver.driversLicense,
    validity: field.driver.validity,
    firstDriversLicenseDate: field.driver.firstDriversLicenseDate,
    additionalRemarks: field.driver.additionalRemarks,
  }
}));

