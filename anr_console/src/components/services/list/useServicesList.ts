import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Services from '@/store/reducers/servicesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredServices } from '@/components/services/list/useDebounce';
import { Service } from '@/types';
import { AuthContext } from "@/context/authContext/AuthContext";

export const useServicesList = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { services, status } = useSelector((state) => state.services);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredServices } = useFilteredServices(searchTerm, services, 700);

  useEffect(() => {
    dispatch(Services.listServices(user.organizationId));
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(Services.setService({
      id: '',
      description: '',
      price: 0,
      additionalRemarks: '',
    }));
    router.push('/Services');
  };

  const handleEditClick = (service: Service) => {
    dispatch(Services.setService(service));
    router.push('/Services');
  };
  
  const handleDeleteClick = async (serviceId: string) => {
    const actionResult = await dispatch(Services.deleteService(serviceId));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(Services.listServices());
    });
  };

  return {
    user,
    services,
    filteredServices,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
};
