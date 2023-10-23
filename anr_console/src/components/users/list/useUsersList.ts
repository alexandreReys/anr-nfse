import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Users from '@/store/reducers/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredUsers } from '@/components/users/list/useDebounceUsers';
import { User } from '@/types';

export const useUsersList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredUsers } = useFilteredUsers(searchTerm, users, 700);
  
  const [organizationId, setOrganizationId] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  useEffect(() => {
    const organizationId = router.query.organizationId;
    const organizationName = router.query.organizationName;

    if (organizationId === undefined || !organizationId) {
      router.push('/Dashboard');
    }
    
    setOrganizationId(organizationId);
    setOrganizationName(organizationName);

    dispatch(Users.listUsers(organizationId));
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(Users.setUser({ 
      organizationId, 
      id: '', 
      email: '', 
      firstName: '', 
      lastName: '', 
      role: ''
    }));
    router.push('/Users');
  };

  const handleEditClick = (user: User) => {
    dispatch(Users.setUser(user));
    router.push('/Users');
  };
  
  const handleDeleteClick = async (userId: string) => {
    const actionResult = await dispatch(Users.deleteUser({organizationId, userId}));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(Users.listUsers());
    });
  };

  return {
    users,
    filteredUsers,
    status,
    error,
    searchTerm,
    setSearchTerm,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    organizationId,
    organizationName,
  };
};
