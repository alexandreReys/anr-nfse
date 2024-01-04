import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "./schema";
import { FormProps } from "./types";
import { useDispatch } from 'react-redux';
import { AuthContext } from "@/context/authContext/AuthContext";

import * as Services from '@/store/reducers/servicesSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { ShowProcessingCallback } from "@/components/snackbar";
import { zipCodeMask } from "@/constants/masks";

import axios from 'axios';
const apiUrl = 'https://viacep.com.br/ws';

export const useServices = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const labelStyles = 'w-30 inline-block mt-4 font-bold text-gray-600';
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
  const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
  const buttonStyles = 'text-white bg-blue-700 hover:bg-blue-600  hover:text-yellow-200 py-3 px-8 rounded font-bold mt-8';
  const errorMsgStyles = 'text-red-900 font-bold text-sm mt-1';

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      service: {
        organizationId: user.organizationId,
        id: '',
        description: '',
        price: 0,
        additionalRemarks: '',
      }
    }
  });

  const handleFormSubmit = async (data: FormProps) => {
    let actionResult = null;

    if (!data.service.id) {
      actionResult = await dispatch(Services.addService(data.service));
    } else {
      actionResult = await dispatch(Services.updateService(data.service));
    };

    try {
      const returnedData = unwrapResult(actionResult);
    } catch (error) {
      console.log('error:', error.message);
    }
    
    ShowProcessingCallback( () => {
      router.push('/ServicesList');
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
  }
};
