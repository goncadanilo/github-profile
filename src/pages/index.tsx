import Head from 'next/head';
import { NextPageContext } from 'next';
import { FaGithub } from 'react-icons/fa';

import styles from 'src/styles/login.module.scss';

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
          <a href="https://github.com/login/oauth/authorize?scope=read:user&client_id=70845afbae6b721138bd">
            <FaGithub />
            Entrar
          </a>
        </section>

        <img src="/images/avatar.svg" alt="Boy coding" />
      </main>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {},
  };
}
