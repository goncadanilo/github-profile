import Head from 'next/head';
import { parseCookies } from 'nookies';

import { Header } from 'src/components/Header';
import { api } from 'src/service/github';
import { User } from 'src/types/user';

// import styles from 'src/styles/dashboard.module.scss';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />
    </>
  );
}
export async function getServerSideProps(ctx: any) {
  const { 'github-token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: user } = await api.get('/user', {
    headers: { Authorization: `token ${token}` },
  });

  return {
    props: { user },
  };
}
