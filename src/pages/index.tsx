import Head from 'next/head';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';

import styles from 'src/styles/login.module.scss';

export default function Login() {
  async function handleSignInWithGithub() {
    try {
      await signIn('github');
    } catch (error) {
      toast.error('Oops! Ocorreu um erro ao tentar fazer login.');
    }
  }

  return (
    <>
      <Head>
        <title>Login | Github Profile</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Github Profile</h1>
          <p>Faça login com seu github para acessar a plataforma.</p>
          <button type="button" onClick={handleSignInWithGithub}>
            <FaGithub />
            Entrar
          </button>
        </section>

        <img src="/images/avatar.svg" alt="Boy coding" />
      </main>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
