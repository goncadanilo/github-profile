import Head from 'next/head';
import { Header } from 'src/components/Header';
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

      <Header user={session.user} />
    </>
  );
}

export const getServerSideProps = withSession;
