// _app.tsx
import React from 'react';
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../context/authContext/AuthContext'
import { Provider } from 'react-redux';
import store from '../store';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
