import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";

import { useDispatch, useSelector } from 'react-redux';
import * as Users from '@/store/reducers/userSlice';
import { unwrapResult } from "@reduxjs/toolkit";

export const useUsers = () => {
  const dispatch = useDispatch();

  const labelStyles = 'w-30 inline-block mt-4';
  const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
  const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
  const buttonStyles = 'text-white bg-blue-600 p-3 rounded font-bold mt-8';

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
    console.log('data...:', data);
    console.log('data.user...:', data.user);
    console.log('data.user.email...:', data.user.email);
    console.log('data.user.id...:', data.user.id);

    let actionResult = null;
    if (!data.user.id) {
      console.log('inclusao');
      actionResult = await dispatch(Users.addUser(data.user));
    } else {
      actionResult = await dispatch(Users.updateUser(data.user));
      // const actionResult = await dispatch(Users.updateUser(data.user));
    };
    const returnedData = unwrapResult(actionResult);
    console.log('returnedData:', returnedData);
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
