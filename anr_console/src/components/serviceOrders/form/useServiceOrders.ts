import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemaForm } from "./schema";
import { FormProps } from "./types";
import { useDispatch } from 'react-redux';
import { AuthContext } from "@/context/authContext/AuthContext";

import * as utils from '@/utils';
import * as ServiceOrders from '@/store/reducers/serviceOrdersSlice';

import { unwrapResult } from "@reduxjs/toolkit";
import { ShowProcessingCallback } from "@/components/snackbar";
import { zipCodeMask } from "@/constants/masks";

import axios from 'axios';
const apiUrl = 'https://viacep.com.br/ws';

export const useServiceOrders = () => {
  const { user } = useContext(AuthContext);
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
      serviceOrder: {
        organizationId: user?.organizationId || '',
        description: '',
        customerId: '',
        total: '',
        additionalRemarks: '',
      }
    }
  })
  
  const handleFormSubmit = async (data: FormProps) => {
    let actionResult = null;

    if (!data.serviceOrder.id) {
      actionResult = await dispatch(ServiceOrders.addServiceOrder(data.serviceOrder));
    } else {
      actionResult = await dispatch(ServiceOrders.updateServiceOrder(data.serviceOrder));
    };

    try {
      const returnedData = unwrapResult(actionResult);
    } catch (error) {
      console.log('error:', error.message);
    }
    
    ShowProcessingCallback( () => {
      router.push('/ServiceOrdersList');
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
