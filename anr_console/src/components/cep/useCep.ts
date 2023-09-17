import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zipCodeMask } from "../../constants/masks";
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";

export const useCep = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      address: {
        zipCode: '',
        street: '',
        number: '',
        district: '',
        complement: '',
        city: '',
        state: '',
      }
    }
  });
  
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded mt-2'
  const buttonStyles = 'flex w-full justify-center text-white bg-blue-600 p-3 rounded font-bold mt-2';
  const errorMsgStyles = 'text-red-900 font-bold text-sm mt-1';
  
  const zipCode = watch('address.zipCode');
  
  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  }
  
  const handleSetData = useCallback((data: AddressProps) => {
    setValue('address.city', data.localidade);
    setValue('address.street', data.logradouro);
    setValue('address.state', data.uf);
    setValue('address.district', data.bairro);
    setValue('address.complement', data.complemento);
  }, [setValue])
  
  const handleFetchAddress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  
    handleSetData(data);
  
  }, [handleSetData])
  
  useEffect(() => {
    setValue('address.zipCode', zipCodeMask(zipCode));
    if (zipCode.length !== 9) return;
    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  return {
    errors,
    register,
    handleFormSubmit,
    handleSubmit,
    inputStyles,
    buttonStyles,
    errorMsgStyles,
  }
}

