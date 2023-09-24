import React, { useState } from 'react';
import { useUsers } from './useUsers';

export default function Users() {
  const {
    register,
    handleSubmit,
    handleFormSubmit,
    inputStyles,
    inputCodeStyles,
    labelStyles,
    buttonStyles
  } = useUsers();

  const Header = () => (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto pt-4 pb-1 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Usuário</h1>
      </div>
    </header>
  );

  const Id = () => (
    <>
      <div className="max-w-7xl mx-auto pt-4 pb-1">
        <p className="text-lg3xl font-bold text-blue-700">Id: 93939939993939</p>
      </div>
      <hr className="border-b-2 border-gray-300 w-full mt-3 mb-4" />
    </>
  );

  return (
    <>
      <Header />
      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <Id />
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-full">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Nome</label>
                <input {...register('user.firstName')} className={inputStyles} type="text" maxLength={60} />
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Sobrenome</label>
                <input {...register('user.lastName')} className={inputStyles} type="text" maxLength={40} />
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Role</label>
                <input {...register('user.role')} className={inputStyles} type="text" maxLength={30} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Email</label>
                <input {...register('user.email')} className={inputStyles} type="text" maxLength={20} />
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Foto</label>
                <input {...register('user.profileImgUrl')} className={inputStyles} type="text" maxLength={30} />
              </div>
            </div>

            <button type="submit" className={buttonStyles}>
              Salvar
            </button>

          </form>
        </div>
      </main>
    </>
  );
}
