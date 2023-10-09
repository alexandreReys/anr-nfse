import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import UsersList from '../components/users/list'
import Nav from '@/components/nav'

export default function UsersListfw() {
  return (
    <>
      <Head>
        <title>Lista de Usuários</title>
      </Head>
      <Nav />
      <UsersList />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { 'nextauth.token': token } = parseCookies(ctx);
  if (!token) {
    return { redirect: { destination: '/', permanent: false, } }
  }
  return { props: {} }
}