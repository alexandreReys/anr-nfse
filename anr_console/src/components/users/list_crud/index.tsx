// listUsers.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PencilAltIcon, TrashIcon, SearchIcon, PlusIcon } from '@heroicons/react/solid';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/reducers/userSlice';
import * as Users from '@/store/reducers/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function ListaUsers() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any>([])
  const router = useRouter();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(Users.listUsers());
  }, [dispatch]);

  type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };

  const handleAddClick = () => {
    dispatch(setUser({ id: '', email: '', firstName: '', lastName: '', role: '' }));
    // dispatch(setUser(user));
    router.push('/Users');
  };

  const handleEditClick = (user: User) => {
    dispatch(setUser(user));
    router.push('/Users');
  };

  const handleDeleteClick = async (userId: string) => {
    const actionResult = await dispatch(Users.deleteUser(userId));
    const returnedData = unwrapResult(actionResult);
    dispatch(Users.listUsers());
    console.log('returnedData:', returnedData);
  };

  // const onAddUser = (user) => {
  //   dispatch(Users.addUser(user));
  // };

  // const onUpdateUser = (user) => {
  //   dispatch(Users.updateUser(user));
  // };

  // const onDeleteUser = (userId) => {
  //   dispatch(Users.deleteUser(userId));
  // };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Lista de Users</h1>

        {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

        <div className="mb-4 relative flex">
          <button
            className="mr-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleAddClick}
          >
            <PlusIcon className="h-5 w-5 inline-block" />
          </button>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Procurar user..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute top-2.5 right-16 h-6 w-6 text-gray-500" />
        </div>

        <table className="min-w-full table-auto border-collapse">
          {status === 'ok' &&
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2 text-left">Ações</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Sobrenome</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
          }
          <tbody>
            {status === 'loading' &&
              <h1 className='mt-6 ml-6 text-3xl font-bold text-yellow-600'>LOADING ...</h1>
            }

            {status === 'ok' && Array.isArray(users) && users.map((user: any) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">
                  <PencilAltIcon
                    className="h-5 w-5 text-blue-500 inline-block mr-2 cursor-pointer"
                    onClick={() => handleEditClick(user)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-500 inline-block cursor-pointer"
                    onClick={() => handleDeleteClick(user.id)}
                  />
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
