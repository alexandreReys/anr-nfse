'use client'

import { useCep } from './useCep';

export default function Team() {
  const { errors, handleFormSubmit, handleSubmit, register, inputStyles, buttonStyles, errorMsgStyles } = useCep();
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 pt-4 pb-1 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Cep</h1>
        </div>
      </header>
      <main className="mx-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md">
            <input {...register('address.zipCode')} className={inputStyles} type="text" placeholder='Cep' maxLength={9} />
            {errors.address?.zipCode?.message && (<p className={errorMsgStyles}>{errors.address?.zipCode?.message}</p>)}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 7 }}>
                <input {...register('address.street')} className={inputStyles} type="text" placeholder='Rua' />
                {errors.address?.street?.message && (<p className={errorMsgStyles}>{errors.address?.street?.message}</p>)}
              </div>

              <div style={{ flex: 3 }}>
                <input {...register('address.number')} className={inputStyles} type="text" placeholder='Numero' />
                {errors.address?.number?.message && (<p className={errorMsgStyles}>{errors.address?.number?.message}</p>)}
              </div>
            </div>

            <input {...register('address.district')} className={inputStyles} type="text" placeholder='Bairro' />
            {errors.address?.district?.message && (<p className={errorMsgStyles}>{errors.address?.district?.message}</p>)}

            <input {...register('address.complement')} className={inputStyles} type="text" placeholder='Complemento' />
            {errors.address?.complement?.message && (<p className={errorMsgStyles}>{errors.address?.complement?.message}</p>)}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 7 }}>
                <input {...register('address.city')} className={inputStyles} type="text" placeholder='Cidade' />
                {errors.address?.city?.message && (<p className={errorMsgStyles}>{errors.address?.city?.message}</p>)}
              </div>

              <div style={{ flex: 3 }}>     
                <input {...register('address.state')} className={inputStyles} type="text" placeholder='Estado' />
                {errors.address?.state?.message && (<p className={errorMsgStyles}>{errors.address?.state?.message}</p>)}
              </div>
            </div>
            
            <button type="submit" className={buttonStyles}>Enviar</button>
          </form>
        </div>
      </main>
    </>
  )
}