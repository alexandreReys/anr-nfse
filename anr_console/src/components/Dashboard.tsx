import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Users from '../store/reducers/userSlice';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Users.getUsers()); // Acessa getUsers como uma propriedade do objeto Users
  }, [dispatch]);

  const { user, status } = useSelector((state) => state.users);

  // Outros exemplos de uso
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          <h2>status: {status}</h2>

          {status === 'succeeded' && user && (
            <p>{user.firstName}</p>
          )}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1>
            Dashboard Content
          </h1>
        </div>
      </main>
    </>
  )
}