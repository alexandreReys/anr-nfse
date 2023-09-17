import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import Nav from '../components/nav'
import Cep from '../components/cep'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Cep</title>
      </Head>
      <Nav />
      <Cep />
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