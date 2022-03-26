import Head from 'next/head';
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
          <button type="button">
            <FaGithub />
            Entrar
          </button>
        </section>

        <img src="/images/avatar.svg" alt="Boy coding" />
      </main>
    </>
  );
}
