import { useCallback, useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from 'sweetalert2';
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";

import { useDispatch, useSelector } from 'react-redux';
import * as Users from '@/store/reducers/userSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { ShowProcessingCallback } from "@/components/snackbar";

export const useUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const labelStyles = 'w-30 inline-block mt-4';
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
  const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
  const buttonStyles = 'text-white bg-blue-700 hover:bg-blue-600  hover:text-yellow-200 py-3 px-8 rounded font-bold mt-8';

  const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        profileImgUrl: '',
      }
    }
  });

  const handleFormSubmit = async (data: FormProps) => {
    let actionResult = null;
    
    if (!data.user.id) {
      actionResult = await dispatch(Users.addUser(data.user));
    } else {
      actionResult = await dispatch(Users.updateUser(data.user));
    };

    try {
      const returnedData = unwrapResult(actionResult);
    } catch (error) {
      console.log('error:', error.message);
    }
    
    ShowProcessingCallback( () => {
      router.push('/UsersList');
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
  }

};
