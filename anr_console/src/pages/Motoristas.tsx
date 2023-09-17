import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import Motoristas from '../components/motoristas/form'
import Nav from '../components/nav'

export default function MotoristasPage() {
  return (
    <div>
      <Head>
        <title>Motoristas</title>
      </Head>
      <Nav />
      <Motoristas />
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