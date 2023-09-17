import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import CargasLista from '../components/CargasLista'
import Nav from '../components/nav'

export default function CargasListaPage() {
  return (
    <div>
      <Head>
        <title>Lista de Cargas</title>
      </Head>
      <Nav />
      <CargasLista />
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