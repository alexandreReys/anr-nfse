import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../services/axios'
import DashboardContent from '../components/Dashboard'
import Nav from '../components/nav'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Nav />
      <DashboardContent />
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