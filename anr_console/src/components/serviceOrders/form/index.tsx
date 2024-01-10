import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useServiceOrders } from './useServiceOrders';
import { useSelector } from 'react-redux';
import { selectServiceOrder } from '@/store/reducers/serviceOrdersSlice';
import { ShowProcessingCallback } from '@/components/snackbar';

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
    errorMsgStyles
  } = useServiceOrders();

  useEffect(() => {
    if (serviceOrder) {
      setValue('serviceOrder.id', serviceOrder.id);
      setValue('serviceOrder.name', serviceOrder.name);
      setValue('serviceOrder.stateRegistration', serviceOrder.stateRegistration);
      setValue('serviceOrder.nationalRegistration', serviceOrder.nationalRegistration);
      setValue('serviceOrder.zipCode', serviceOrder.zipCode);
      setValue('serviceOrder.street', serviceOrder.street);
      setValue('serviceOrder.number', serviceOrder.number);
      setValue('serviceOrder.district', serviceOrder.district);
      setValue('serviceOrder.complement', serviceOrder.complement);
      setValue('serviceOrder.city', serviceOrder.city);
      setValue('serviceOrder.state', serviceOrder.state);
      setValue('serviceOrder.phoneNumber', serviceOrder.phoneNumber);
      setValue('serviceOrder.email', serviceOrder.email);
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
                <label className={labelStyles}>Nome *</label>
                <input {...register('serviceOrder.name')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={60} />
                {errors.serviceOrder?.name?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.name?.message}</p>)}
              </div>
              <div className="flex-1">
                <label className={labelStyles}>CNPJ *</label>
                <input {...register('serviceOrder.nationalRegistration')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
                {errors.serviceOrder?.nationalRegistration?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.nationalRegistration?.message}</p>)}
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Inscr.Estadual</label>
                <input {...register('serviceOrder.stateRegistration')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Telefone *</label>
                <input {...register('serviceOrder.phoneNumber')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
                {errors.serviceOrder?.phoneNumber?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.phoneNumber?.message}</p>)}
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Email *</label>
                <input {...register('serviceOrder.email')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
                {errors.serviceOrder?.email?.message && (<p className={errorMsgStyles}>{errors.serviceOrder?.email?.message}</p>)}
              </div>
            </div>

            <h1 className="text-2xl text-blue-800 mt-4 border-b w-full"><strong>Endereço</strong></h1>

            <label className={labelStyles}>Cep</label>
            <input {...register('serviceOrder.zipCode')} onKeyDown={handleKeyDown} className={inputCodeStyles} type="text" maxLength={9} />

            <div className="flex gap-4">
              <div className="flex-grow flex-shrink-0">
                <label className={labelStyles}>Logradouro</label>
                <input {...register('serviceOrder.street')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={60} />
              </div>
              <div className="w-2/12">
                <label className={labelStyles}>Número</label>
                <input {...register('serviceOrder.number')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={20} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelStyles}>Bairro</label>
                <input {...register('serviceOrder.district')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Complemento</label>
                <input {...register('serviceOrder.complement')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-grow flex-shrink-0">
                <label className={labelStyles}>Cidade</label>
                <input {...register('serviceOrder.city')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
              </div>

              <div className="w-2/12">
                <label className={labelStyles}>Estado</label>
                <select {...register('serviceOrder.state')} onKeyDown={handleKeyDown} className={inputStyles}>
                  <option value="" disabled>Selecione um Estado</option>
                  <option value="AC">Acre (AC)</option>
                  <option value="AL">Alagoas (AL)</option>
                  <option value="AP">Amapá (AP)</option>
                  <option value="AM">Amazonas (AM)</option>
                  <option value="BA">Bahia (BA)</option>
                  <option value="CE">Ceará (CE)</option>
                  <option value="DF">Distrito Federal (DF)</option>
                  <option value="ES">Espírito Santo (ES)</option>
                  <option value="GO">Goiás (GO)</option>
                  <option value="MA">Maranhão (MA)</option>
                  <option value="MT">Mato Grosso (MT)</option>
                  <option value="MS">Mato Grosso do Sul (MS)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="PA">Pará (PA)</option>
                  <option value="PB">Paraíba (PB)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="PE">Pernambuco (PE)</option>
                  <option value="PI">Piauí (PI)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="RN">Rio Grande do Norte (RN)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="RO">Rondônia (RO)</option>
                  <option value="RR">Roraima (RR)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="SE">Sergipe (SE)</option>
                  <option value="TO">Tocantins (TO)</option>
                </select>
              </div>
            </div>

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
