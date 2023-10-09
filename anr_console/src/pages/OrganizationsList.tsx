import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import OrganizationsListComponent from '../components/organizations/list'
import Nav from '@/components/nav'

export default function OrganizationsList() {
  return (
    <>
      <Head>
        <title>Lista de Organizações</title>
      </Head>
      <Nav />
      <OrganizationsListComponent />
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