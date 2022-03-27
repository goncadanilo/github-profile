import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { withSession } from 'src/helpers/withSession';

interface User {
  name: string;
  email: string;
  image: string;
}

export default function Home({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Home | Github Profile </title>
      </Head>
      <h1>Hello, {user.name}</h1>
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}

export const getServerSideProps = withSession;
