import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { withSession } from 'src/helpers/withSession';
import { UserSession } from 'src/types/userSession';

interface DashboardProps {
  session: UserSession;
}

export default function Dashboard({ session }: DashboardProps) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>Hello, {session.user.name}</h1>
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}

export const getServerSideProps = withSession;
