import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import Veiculos from '../components/Veiculos'
import Nav from '../components/nav'

export default function VeiculosPage() {
  return (
    <div>
      <Head>
        <title>Veiculos</title>
      </Head>
      <Nav />
      <Veiculos />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { 'nextauth.token': token } = parseCookies(ctx);
  if (!token) {
    return {redirect: {destination: '/',permanent: false,}}
  }
  return {props: {}}
}