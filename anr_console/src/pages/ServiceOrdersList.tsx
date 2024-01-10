import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import ServiceOrdersListComponent from '../components/serviceOrders/list'
import Nav from '@/components/nav'

export default function customersList() {
  return (
    <>
      <Head>
        <title>Lista de Ordens de Serviço</title>
      </Head>
      <Nav />
      <ServiceOrdersListComponent />
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