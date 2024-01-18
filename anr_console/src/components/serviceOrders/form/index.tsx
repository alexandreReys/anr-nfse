import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useServiceOrders } from './useServiceOrders';
import { useSelector } from 'react-redux';
import { selectServiceOrder } from '@/store/reducers/serviceOrdersSlice';
import { ShowProcessingCallback } from '@/components/snackbar';
import CustomerSelect from '@/components/CustomersSelect';

export default function ServiceOrders() {
  const router = useRouter();
  const serviceOrder = useSelector(selectServiceOrder);

  const {
    errors,
    register,
    setValue,
    handleSubmit,
    handleFormSubmit,
    inputStyles,
    inputCodeStyles,
    labelStyles,
    buttonStyles,
    errorMsgStyles,
    statesList,
  } = useServiceOrders();

  useEffect(() => {
    if (serviceOrder) {
      setValue('serviceOrder.id', serviceOrder.id);
      setValue('serviceOrder.organizationId', serviceOrder.organizationId);
      setValue('serviceOrder.description', serviceOrder.description);
      setValue('serviceOrder.customerId', serviceOrder.customerId);
      setValue('serviceOrder.total', serviceOrder.total);
      setValue('serviceOrder.additionalRemarks', serviceOrder.additionalRemarks);
    }
  }, [serviceOrder, setValue]);

  const handleCancel = () => {
    router.push('/ServiceOrdersList');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

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
        <p className="text-lg3xl font-bold text-gray-600">{serviceOrder && serviceOrder.id ? `ID :  ${serviceOrder.id}` : 'Incluindo ...'}</p>
      </div>
      <hr className="border-b-2 border-gray-300 w-full mt-3 mb-4" />
    </>
  );

  return (
    <>
      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <Id />
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-full">

            <h1 className="text-2xl text-blue-800 mt-4 border-b w-full"><strong>Informações Gerais</strong></h1>

            <div className="flex gap-4">
              <div className="flex-1">
                <CustomerSelect
                  register={register}
                  handleKeyDown={handleKeyDown}
                  labelStyles={labelStyles}
                  inputStyles={inputStyles}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Descrição do Serviço</label>
                <input {...register('serviceOrder.description')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={60} />
                {errors.serviceOrder?.description?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.description?.message}</p>)}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Observações</label>
                <input {...register('serviceOrder.additionalRemarks')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
                {errors.serviceOrder?.additionalRemarks?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.additionalRemarks?.message}</p>)}
              </div>
            </div>

            <h1 className="text-2xl text-blue-800 mt-4 border-b w-full"><strong>Serviços a executar :</strong></h1>

            <div className='flex justify-between mx-2'>
              <button type="submit" className={buttonStyles}>
                Salvar
              </button>
              <button type="button" className={buttonStyles} onClick={handleCancel}>
                Cancelar
              </button>
            </div>

          </form>
        </div >
      </main >
    </>
  );
}
