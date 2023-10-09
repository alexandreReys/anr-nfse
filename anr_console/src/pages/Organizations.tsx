import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import Organizations from '../components/organizations/form'
import Nav from '../components/nav'

export default function OrganizationsPage() {
  return (
    <div>
      <Head>
        <title>Usuários</title>
      </Head>
      <Nav />
      <Organizations />
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