import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import CustomersListComponent from '../components/customers/list'
import Nav from '@/components/nav'

export default function customersList() {
  return (
    <>
      <Head>
        <title>Lista de Clientes</title>
      </Head>
      <Nav />
      <CustomersListComponent />
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