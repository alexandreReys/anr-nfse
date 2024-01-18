import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "./schema";
import { FormProps } from "./types";
import * as utils from '@/utils'
import { useDispatch } from 'react-redux';
import * as Organizations from '@/store/reducers/organizationsSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { ShowProcessingCallback } from "@/components/snackbar";
import { zipCodeMask } from "@/constants/masks";

import axios from 'axios';
const apiUrl = 'https://viacep.com.br/ws';

export const useOrganizations = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const labelStyles = 'w-30 inline-block mt-4 font-bold text-gray-600';
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
  const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
  const buttonStyles = 'text-white bg-blue-700 hover:bg-blue-600  hover:text-yellow-200 py-3 px-8 rounded font-bold mt-8';
  const errorMsgStyles = 'text-red-900 font-bold text-sm mt-1';
  const statesList = utils.statesList;

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      organization: {
        name: '',
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
        additionalRemarks: '',
      }
    }
  });

  const zipCode = watch('organization.zipCode');

  const handleSetData = useCallback((data: AddressProps) => {
    setValue('organization.city', data.localidade);
    setValue('organization.street', data.logradouro);
    setValue('organization.state', data.uf);
    setValue('organization.district', data.bairro);
    setValue('organization.complement', '');
  }, [setValue])
  
  const handleFetchAddress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(`${apiUrl}/${zipCode}/json/`);
    handleSetData(data);
  }, [handleSetData])
  
  useEffect(() => {
    if (!zipCode) return;

    setValue('organization.zipCode', zipCodeMask(zipCode));
    if (zipCode.length !== 9) return;

    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode]);

  const handleFormSubmit = async (data: FormProps) => {
    let actionResult = null;

    if (!data.organization.id) {
      actionResult = await dispatch(Organizations.addOrganization(data.organization));
    } else {
      actionResult = await dispatch(Organizations.updateOrganization(data.organization));
    };

    try {
      const returnedData = unwrapResult(actionResult);
    } catch (error) {
      console.log('error:', error.message);
    }
    
    ShowProcessingCallback( () => {
      router.push('/OrganizationsList');
    })
  };

  return {
    errors,
    register,
    setValue,
    handleFormSubmit,
    handleSubmit,
    inputStyles,
    inputCodeStyles,
    labelStyles,
    buttonStyles,
    errorMsgStyles,
    statesList,
  }
};
