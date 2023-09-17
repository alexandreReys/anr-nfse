import React, { useState } from 'react';
import { useMotorista } from './useMotorista';
import { TabsProps, NavigationButtonsProps } from "./types";

export default function Motoristas() {
  const [currentTab, setCurrentTab] = useState(1);
  const { register, handleSubmit, handleFormSubmit, inputStyles, inputCodeStyles, labelStyles } = useMotorista();

  const Header = () => (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto pt-4 pb-1 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Motorista</h1>
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

  const Tabs: React.FC<TabsProps> = ({ currentTab, setCurrentTab }) => {
    const tabStyles = 'cursor-pointer px-6 py-2 border-b-4 text-xl';
    const activeTabStyles = `${tabStyles} border-blue-600 font-bold text-red-700`;

    return (
      <>
        <div className="flex space-x-4 ml-0 mb-6">
          <button
            className={currentTab === 1 ? activeTabStyles : tabStyles}
            onClick={() => setCurrentTab(1)}
          >
            Dados Gerais
          </button>
          <button
            className={currentTab === 2 ? activeTabStyles : tabStyles}
            onClick={() => setCurrentTab(2)}
          >
            Endereço
          </button>
          <button
            className={currentTab === 3 ? activeTabStyles : tabStyles}
            onClick={() => setCurrentTab(3)}
          >
            Habilitação
          </button>
        </div>
        {/* <hr className="border-b-2 border-gray-300 w-full mt-3 mb-4" /> */}
      </>
    );
  };

  const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentTab, setCurrentTab }) => {
    const navButtonStyles = 'text-white bg-blue-600 p-3 rounded font-bold';
    const buttonStyles = 'text-white bg-blue-600 p-3 rounded font-bold';

    return (
      <div className="flex justify-between mt-6">
        <div className="flex-grow">
          {currentTab !== 1 && <button type="button" className={navButtonStyles} onClick={() => setCurrentTab(currentTab - 1)}>
            Voltar
          </button>}
        </div>

        <div className="flex justify-end">
          {currentTab !== 3 && <button type="button" className={navButtonStyles} onClick={() => setCurrentTab(currentTab + 1)}>
            Próximo
          </button>}
        </div>

        {currentTab === 3 && <button type="submit" className={buttonStyles}>
          Salvar
        </button>}
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <Id />
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-full">

            {currentTab === 1 && (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>Nome</label>
                    <input {...register('driver.firstName')} className={inputStyles} type="text" maxLength={60} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>Sobrenome</label>
                    <input {...register('driver.lastName')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                </div>

                <label className={labelStyles}>Data Nasc</label>
                <input {...register('driver.birthDate')} className={inputCodeStyles} type="text" maxLength={20} />

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>RG</label>
                    <input {...register('driver.stateRegistration')} className={inputStyles} type="text" maxLength={30} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>CPF</label>
                    <input {...register('driver.nationalRegistration')} className={inputStyles} type="text" maxLength={30} />
                  </div>
                </div>
              </>
            )}

            {currentTab === 2 && (
              <>
                <label className={labelStyles}>Cep</label>
                <input {...register('driver.zipCode')} className={inputCodeStyles} type="text" maxLength={9} />

                <div className="flex gap-4">
                  <div className="flex-grow flex-shrink-0">
                    <label className={labelStyles}>Logradouro</label>
                    <input {...register('driver.street')} className={inputStyles} type="text" maxLength={60} />
                  </div>
                  <div className="w-2/12">
                    <label className={labelStyles}>Número</label>
                    <input {...register('driver.number')} className={inputStyles} type="text" maxLength={20} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>Bairro</label>
                    <input {...register('driver.district')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>Complemento</label>
                    <input {...register('driver.complement')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-grow flex-shrink-0">
                    <label className={labelStyles}>Cidade</label>
                    <input {...register('driver.city')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                  <div className="w-2/12">
                    <label className={labelStyles}>Estado</label>
                    <input {...register('driver.state')} className={inputStyles} type="text" maxLength={2} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>Telefone</label>
                    <input {...register('driver.phoneNumber')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>Email</label>
                    <input {...register('driver.email')} className={inputStyles} type="text" maxLength={40} />
                  </div>
                </div>
              </>
            )}

            {currentTab === 3 && (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>Categoria</label>
                    <input {...register('driver.category')} className={inputStyles} type="text" maxLength={20} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>Numero Habilitação</label>
                    <input {...register('driver.driversLicense')} className={inputStyles} type="text" maxLength={20} />
                  </div>

                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={labelStyles}>Validade</label>
                    <input {...register('driver.validity')} className={inputStyles} type="text" maxLength={20} />
                  </div>
                  <div className="flex-1">
                    <label className={labelStyles}>Data da Primeira Habilitação</label>
                    <input {...register('driver.firstDriversLicenseDate')} className={inputStyles} type="text" maxLength={20} />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-grow">
                    <label className={labelStyles}>Observação</label>
                    <input {...register('driver.additionalRemarks')} className={inputStyles} type="text" maxLength={250} />
                  </div>
                </div>
              </>
            )}

            <NavigationButtons currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </form>
        </div>
      </main>
    </>
  );
}
