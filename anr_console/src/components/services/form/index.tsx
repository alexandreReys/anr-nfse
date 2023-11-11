import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useServices } from './useServices';
import { useSelector } from 'react-redux';
import { selectService } from '@/store/reducers/servicesSlice';
import { ShowProcessingCallback } from '@/components/snackbar';

export default function Services() {
  const router = useRouter();
  const service = useSelector(selectService);

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
  } = useServices();

  useEffect(() => {
    if (service) {
      setValue('service.organizationId', service.organizationId);
      setValue('service.id', service.id);
      setValue('service.description', service.description);
      setValue('service.price', service.price);
      setValue('service.additionalRemarks', service.additionalRemarks);
    }
  }, [service, setValue]);

  const handleCancel = () => {
    router.push('/ServicesList');
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
        <h1 className="text-3xl font-bold text-gray-900">Serviço</h1>
      </div>
    </header>
  );

  const Id = () => (
    <>
      <div className="max-w-7xl mx-auto pt-4 pb-1">
        <p className="text-lg3xl font-bold text-gray-600">
          {service && service.id ? `ID :  ${service.id}` : 'Incluindo ...'}
        </p>
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
                <label className={labelStyles}>Descrição *</label>
                <input {...register('service.description')} onKeyDown={handleKeyDown} className={inputStyles} type="text" maxLength={40} />
                {errors.service?.description?.message && (<p className={errorMsgStyles}>{errors.service?.description?.message}</p>)}
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Preço *</label>
                <input {...register('service.price')} onKeyDown={handleKeyDown} className={inputCodeStyles} type="number" step="0.01" min="0" placeholder="0,00" />
                {errors.service?.price?.message && (<p className={errorMsgStyles}>{errors.service?.price?.message}</p>)}
              </div>
            </div>

            <label className={labelStyles}>Observações</label>
            <input {...register('service.additionalRemarks')} onKeyDown={handleKeyDown} className={inputStyles} type="text" />

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

// import { NumericFormat } from 'react-number-format';

{/* <NumericFormat
  {...register('service.price')}
  className={inputCodeStyles}
  thousandSeparator={'.'}
  decimalSeparator={','}
  fixedDecimalScale={true}
  decimalScale={2}
  prefix={'R$ '}
  placeholder="R$ 0,00"
  onValueChange={(values) => {
    const { floatValue } = values;
    setValue('service.price', floatValue || 0); // Aqui você pode ajustar o comportamento conforme a necessidade
  }}
  isNumericString
/> */}