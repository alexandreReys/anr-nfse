import { useEffect } from "react";
import { useForm } from "react-hook-form";

const inputStyles = 'flex w-full border border-gray-500 px-2 py-1 rounded';
const inputCodeStyles = 'flex w-36 border border-gray-500 px-2 py-1 rounded';
const buttonStyles = 'flex w-full justify-center text-white bg-blue-600 p-3 rounded font-bold mt-6';
const labelStyles = 'w-30 inline-block mt-2 font-bold';

export default function Test() {

  const { handleSubmit, register, watch, formState: { errors } } = useForm();

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  const cep = watch('driver.cep');
  useEffect(() => {
    console.log('driver.cep:', cep);
  }, [cep]);


  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto pt-4 pb-1 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Test</h1>
        </div>
      </header>

      <main className="mx-auto">
        <div className="max-w-7xl mx-auto pb-6 pt-2 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-full">

            <label className={labelStyles}>Cep</label>
            <input {...register('driver.cep')} className={inputCodeStyles} type="text" placeholder='Cep' />

            <button type="submit" className={buttonStyles}>Enviar</button>
          </form>
        </div>
      </main>
    </>
  )
}
