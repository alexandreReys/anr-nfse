import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import RelatViagensRecentes from '../components/RelatViagensRecentes'
import Nav from '../components/nav'

export default function Projects() {
  return (
    <div>
      <Head>
        <title>Viagens Recentes</title>
      </Head>
      <Nav />
      <RelatViagensRecentes />
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