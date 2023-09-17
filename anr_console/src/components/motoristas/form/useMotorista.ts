import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as masks from "@/constants/masks";
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";

export const useMotorista = () => {
  const labelStyles = 'w-30 inline-block mt-2 font-bold';
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
  const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      driver: {
        firstName: '',
        lastName: '',
        birthDate: '',
        stateRegistration: '',
        nationalRegistration: '',
        zipCode: '',
        street: '',
        number: '',
        district: '',
        complement: '',
        city: '',
        state: '',
        phoneNumber: '',
        email: '',
        category: '',
        driversLicense: '',
        validity: '',
        firstDriversLicenseDate: '',
        additionalRemarks: '',
      }
    }
  });

  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Tratamento da mascara de Cep e consulta API da visualViewport.cep.com
  ////////////////////////////////////////////////////////////////////////////////
  const zipCode = watch('driver.zipCode');

  const handleSetData = useCallback((data: AddressProps) => {
    setValue('driver.city', data.localidade);
    setValue('driver.street', data.logradouro);
    setValue('driver.state', data.uf);
    setValue('driver.district', data.bairro);
    setValue('driver.complement', data.complemento);
  }, [setValue])
  
  const handleFetchAddress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
    handleSetData(data);
  }, [handleSetData])

  useEffect(() => {
    setValue('driver.zipCode', masks.zipCodeMask(zipCode));
    if (zipCode.length !== 9) return;
    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  ////////////////////////////////////////////////////////////////////////////////
  // Tratamento da mascara de RG
  ////////////////////////////////////////////////////////////////////////////////
  const stateRegistration = watch('driver.stateRegistration');

  useEffect(() => {
    setValue('driver.stateRegistration', masks.stateRegistrationMask(stateRegistration));
  }, [stateRegistration]);

  ////////////////////////////////////////////////////////////////////////////////
  // Tratamento da mascara de CPF
  ////////////////////////////////////////////////////////////////////////////////
  const nationalRegistration = watch('driver.nationalRegistration');

  useEffect(() => {
    setValue('driver.nationalRegistration', masks.nationalRegistrationMask(nationalRegistration));
  }, [nationalRegistration]);

  ////////////////////////////////////////////////////////////////////////////////
  // Tratamento da mascara de Categoria de CNH
  ////////////////////////////////////////////////////////////////////////////////
  const category = watch('driver.category');

  useEffect(() => {
    setValue('driver.category', masks.driversLicenceCategoryMask(category));
  }, [category]);

  ////////////////////////////////////////////////////////////////////////////////
  // Tratamento da mascara de Validade da CNH
  ////////////////////////////////////////////////////////////////////////////////
  const validity = watch('driver.validity');

  useEffect(() => {
    setValue('driver.validity', masks.monthYearMask(validity));
  }, [validity]);


  return {
    errors,
    register,
    handleFormSubmit,
    handleSubmit,
    inputStyles,
    inputCodeStyles,
    labelStyles,
  }
};
