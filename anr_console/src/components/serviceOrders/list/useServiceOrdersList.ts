import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as ServiceOrders from '@/store/reducers/serviceOrdersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredServiceOrders } from '@/components/serviceOrders/list/useDebounce';
import { ServiceOrderType } from '@/types';
import { AuthContext } from "@/context/authContext/AuthContext";

export const useServiceOrdersList = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { serviceOrders, status } = useSelector((state) => state.serviceOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedUser, setLoggedUser] = useState({});
  const { filteredServiceOrders } = useFilteredServiceOrders(searchTerm, serviceOrders, 700);

  useEffect(() => {
    if (!!user) {
      setLoggedUser(user);
      dispatch(ServiceOrders.listServiceOrders(user?.organizationId));
    }
    
  }, [dispatch, user]);

  const handleAddClick = () => {
    dispatch(ServiceOrders.setServiceOrder({
      organizationId: user.organizationId,
      id: '',
      name: '',
      additionalRemarks: '',
    }));
    router.push('/ServiceOrders');
  };

  const handleEditClick = (serviceOrder: ServiceOrderType) => {
    dispatch(ServiceOrders.setServiceOrder(serviceOrder));
    router.push('/ServiceOrders');
  };
  
  const handleDeleteClick = async (serviceOrderId: string) => {
    const actionResult = await dispatch(ServiceOrders.deleteServiceOrder({
      organizationId: user.organizationId, 
      serviceOrderId
    }));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(ServiceOrders.listServiceOrders(loggedUser.organizationId));
    });
  };

  return {
    user,
    serviceOrders,
    filteredServiceOrders,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
};
