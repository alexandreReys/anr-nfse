import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext/AuthContext';
import { SignInData } from '@/context/authContext/types'

export default function Home() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { signIn } = useContext(AuthContext);

  const userStyles =
    'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 ' +
    'text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';

  const passwordStyles = `${userStyles} mt-4`;

  async function handleSignIn(data: SignInData) {
    await signIn(data);
  }

  const TabTitle = () => {
    return (
      <Head>
        <title>Home</title>
      </Head>
    );
  }

  const Logo = () => {
    return (
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
    );
  }

  const Email = () => {
    return (
      <div>
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input {...register('email')} id="email-address" name="email" type="email" autoComplete="email" required className={userStyles} placeholder="Email address" />
      </div>
    )
  }

  const Password = () => {
    return (
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input {...register('password')} id="password" name="password" type="password" autoComplete="current-password" required className={passwordStyles} placeholder="Password" />
      </div>
    )
  }

  const RememberMe = () => {
    return (
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
          Lembrar
        </label>
      </div>
    );
  }

  const ForgotPassword = () => {
    return (
      <>
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Esqueceu sua senha?
          </a>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />
      </>
    );
  }

  const ButtonSubmit = () => {
    return (
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign in
      </button>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <TabTitle />

      <div className="max-w-sm w-full space-y-8">
        <Logo />

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>

          <div className="rounded-md shadow-sm -space-y-px">
            <Email />
            <Password />
          </div>

          <div className="flex items-center justify-between">
            <RememberMe />
            <ForgotPassword />
          </div>

          <ButtonSubmit />
        </form>
      </div>
    </div>
  )
}
