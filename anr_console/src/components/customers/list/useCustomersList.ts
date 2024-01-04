import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Customers from '@/store/reducers/customersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredCustomers } from '@/components/customers/list/useDebounce';
import { CustomerType } from '@/types';
import { AuthContext } from "@/context/authContext/AuthContext";

export const useCustomersList = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { customers, status } = useSelector((state) => state.customers);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedUser, setLoggedUser] = useState({});
  const { filteredCustomers } = useFilteredCustomers(searchTerm, customers, 700);

  useEffect(() => {
    if (!!user) {
      setLoggedUser(user);
      dispatch(Customers.listCustomers(user?.organizationId));
    }
    
  }, [dispatch, user]);

  const handleAddClick = () => {
    dispatch(Customers.setCustomer({
      organizationId: user.organizationId,
      id: '',
      name: '',
      additionalRemarks: '',
    }));
    router.push('/Customers');
  };

  const handleEditClick = (customer: CustomerType) => {
    dispatch(Customers.setCustomer(customer));
    router.push('/Customers');
  };
  
  const handleDeleteClick = async (customerId: string) => {
    const actionResult = await dispatch(Customers.deleteCustomer({
      organizationId: user.organizationId, 
      customerId
    }));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(Customers.listCustomers(loggedUser.organizationId));
    });
  };

  return {
    user,
    customers,
    filteredCustomers,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
};
