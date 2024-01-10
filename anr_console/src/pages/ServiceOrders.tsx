import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import ServiceOrders from '../components/serviceOrders/form'
import Nav from '../components/nav'

export default function ServiceOrdersPage() {
  return (
    <div>
      <Head>
        <title>Ordens de Serviço</title>
      </Head>
      <Nav />
      <ServiceOrders />
    </div>
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