import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Users from '@/store/reducers/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredUsers } from '@/components/users/list/useDebounceUsers';
import { UserType } from '@/types';
import { AuthContext } from "@/context/authContext/AuthContext";

export const useUsersList = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredUsers } = useFilteredUsers(searchTerm, users, 700);
  const [organizationId, setOrganizationId] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  useEffect(() => {
    let organizationId = router.query.organizationId;
    let organizationName = router.query.organizationName;

    if (organizationId === undefined || !organizationId) {
      if (!!user) {
        setOrganizationId(user.organizationId);
        setOrganizationName(user.organizationName);
        dispatch(Users.listUsers(user.organizationId));
      };
    } else {
      setOrganizationId(organizationId);
      setOrganizationName(organizationName);
      dispatch(Users.listUsers(organizationId));
    }

  }, [dispatch, user]);

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

  const handleEditClick = (user: UserType) => {
    dispatch(Users.setUser(user));
    router.push('/Users');
  };
  
  const handleDeleteClick = async (userId: string) => {
    const actionResult = await dispatch(Users.deleteUser({organizationId, userId}));
    const returnedData = unwrapResult(actionResult);

    ShowProcessingCallback(() => {
      dispatch(Users.listUsers(organizationId));
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
