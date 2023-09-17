import { z } from "zod";
import { schemaForm } from "./schema";

export type FormProps = z.infer<typeof schemaForm>;

// export type motoristaProps = {
//   firstName: string,
//   lastName: string,
//   birthDate: string,
//   stateRegistration: string,
//   nationalRegistration: string,
//   zipCode: string,
//   street: string,
//   number: string,
//   district: string,
//   complement: string,
//   city: string,
//   state: string,
//   phoneNumber: string,
//   email: string,
//   category: string,
//   driversLicense: string,
//   validity: string,
//   firstDriversLicenseDate: string,
//   additionalRemarks: string,
// };

export type AddressProps = {
  cep: string,
  bairro: string,
  complemento: string,
  uf: string,
  logradouro: string,
  localidade: string,
};

export interface TabsProps {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

export interface NavigationButtonsProps {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}
