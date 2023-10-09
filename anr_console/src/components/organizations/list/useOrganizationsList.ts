// useOrganizationList.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Organizations from '@/store/reducers/organizationsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredOrganizations } from '@/components/organizations/list/useDebounce';
import { OrganizationType } from '../types';

export const useOrganizationsList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { organizations, status } = useSelector((state) => state.organizations);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredOrganizations } = useFilteredOrganizations(searchTerm, organizations, 700);

  useEffect(() => {
    dispatch(Organizations.listOrganizations());
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(Organizations.setOrganization({
      id: '',
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
    }));
    router.push('/Organizations');
  };

  const handleEditClick = (organization: OrganizationType) => {
    dispatch(Organizations.setOrganization(organization));
    router.push('/Organizations');
  };

  const handleDeleteClick = async (organizationId: string) => {
    const actionResult = await dispatch(Organizations.deleteOrganization(organizationId));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(Organizations.listOrganizations());
    });
  };

  return {
    organizations,
    filteredOrganizations,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
  };
};
