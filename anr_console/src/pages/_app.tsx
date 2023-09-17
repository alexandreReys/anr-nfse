import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../context/authContext/AuthContext'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
