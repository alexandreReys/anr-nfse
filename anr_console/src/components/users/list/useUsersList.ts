// useUserList.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as Users from '@/store/reducers/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ShowProcessingCallback } from '@/components/snackbar';
import { useFilteredUsers } from '@/components/users/list/useDebounceUsers';

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export const useUserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredUsers } = useFilteredUsers(searchTerm, users, 700);

  useEffect(() => {
    dispatch(Users.listUsers());
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(Users.setUser({ id: '', email: '', firstName: '', lastName: '', role: '' }));
    router.push('/Users');
  };

  const handleEditClick = (user: User) => {
    dispatch(Users.setUser(user));
    router.push('/Users');
  };

  const handleDeleteClick = async (userId: string) => {
    const actionResult = await dispatch(Users.deleteUser(userId));
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
  };
};
