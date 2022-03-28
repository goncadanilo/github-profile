import Head from 'next/head';
import { parseCookies } from 'nookies';
import { FaGithub } from 'react-icons/fa';

import styles from 'src/styles/login.module.scss';

const CLIENT_ID = process.env.GITHUB_APP_CLIENT_ID;
const SCOPE = 'read:user';
const AUTH_URL = `https://github.com/login/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}`;

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Github Profile</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Github Profile</h1>
          <p>Faça login com seu github para acessar a plataforma.</p>
          <a title="Entrar com Github" href={AUTH_URL}>
            <FaGithub />
            Entrar
          </a>
        </section>

        <img src="/images/avatar.svg" alt="Boy coding" />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { 'github-token': token } = parseCookies(ctx);

  if (token) {
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
