import { parseCookies } from 'nookies';
import { FaGithub } from 'react-icons/fa';

import { Head } from 'src/components/Head';

import styles from 'src/styles/login.module.scss';

interface LoginPageProps {
  clientId: string;
}

export default function LoginPage({ clientId }: LoginPageProps) {
  return (
    <>
      <Head title="Login | Github Profile" />

      <main className={styles.container}>
        <section className={styles.hero}>
          <h1>Github Profile</h1>
          <p>Faça login com seu github para acessar a plataforma.</p>
          <a
            title="Entrar com Github"
            href={`https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}`}
          >
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
    props: { clientId: process.env.GITHUB_APP_CLIENT_ID },
  };
}
