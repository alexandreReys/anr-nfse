import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import Customers from '../components/customers/form'
import Nav from '../components/nav'

export default function CustomersPage() {
  return (
    <div>
      <Head>
        <title>Clientes</title>
      </Head>
      <Nav />
      <Customers />
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