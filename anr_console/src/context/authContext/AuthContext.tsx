import { createContext, useEffect, useState } from "react";
import { recoverUserInformation, signInRequest } from "../../services/auth";
import Router from 'next/router'

import { setCookie, parseCookies } from 'nookies';
import { api } from "../../services/api";
import { User, SignInData, AuthContextType } from '@/context/authContext/types';
import { ChildrenProps } from '@/types/types';

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      recoverUserInformation().then(response => {
        setUser(response.user);
      });
    };
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({ email, password });

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push('/Dashboard');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}