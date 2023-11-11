import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode
}

export type OrganizationType = {
  id: string,
  name: string,
  stateRegistration: string,
  nationalRegistration: string,
  zipCode: string,
  street: string,
  number: string,
  district: string,
  complement: string,
  city: string,
  state: string,
  phoneNumber: string,
  email: string,
  additionalRemarks: string,
}

export type UserType = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  role: string,
};

export type ServiceType = {
  organizationId: string,
  id: string,
  description: string,
  price: number,
  additionalRemarks: string,
}