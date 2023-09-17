import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import VeiculosLista from '../components/VeiculosLista'
import Nav from '../components/nav'

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Lista Motoristas</title>
      </Head>
      <Nav />
      <VeiculosLista />
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