import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "./schema";
import { AddressProps, FormProps } from "./types";

export const useUsers = () => {
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

  const handleFormSubmit = (data: FormProps) => {
    console.log(data);
  }

  return {
    errors,
    register,
    handleFormSubmit,
    handleSubmit,
    inputStyles,
    inputCodeStyles,
    labelStyles,
    buttonStyles,
  }
};
