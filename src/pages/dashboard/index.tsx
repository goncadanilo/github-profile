import Head from 'next/head';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { FaTwitter } from 'react-icons/fa';
import { FiUsers, FiLink, FiMapPin, FiMail } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { BiBuildings } from 'react-icons/bi';

import { Header } from 'src/components/Header';
import { api } from 'src/service/github';
import { User } from 'src/types/user';

import styles from 'src/styles/dashboard.module.scss';

interface DashboardProps {
  user: User;
  token: string;
}

interface Repository {
  id: number;
  name: string;
}

export default function Dashboard({ user, token }: DashboardProps) {
  const [repositories, setRepositories] = useState<Repository[]>(
    [] as Repository[],
  );

  async function loadRepositories() {
    try {
      const { data: repositoriesData } = await api.get(
        `${user.repos_url}?page=1&per_page=5`,
        {
          headers: { Authorization: `token ${token}` },
        },
      );

      setRepositories(repositoriesData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadRepositories();
  }, [user]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <section className={styles.hero}>
          <img src={user.avatar_url} alt={user.name} />

          <div className={styles.userInfoGroup}>
            <h1>{user.name}</h1>
            <h3>{user.login}</h3>
            <p>{user.bio}</p>
          </div>

          <div className={styles.followersGroup}>
            <span>
              <FiUsers />
              <span>{user.followers}</span> seguidores
            </span>
            <span>
              <BsDot />
              <span>{user.following}</span> seguindo
            </span>
          </div>

          <div className={styles.socialGroup}>
            {user.company && (
              <span>
                <BiBuildings />
                {user.company}
              </span>
            )}
            {user.location && (
              <span>
                <FiMapPin />
                {user.location}
              </span>
            )}
            {user.email && (
              <span>
                <FiMail />
                {user.email}
              </span>
            )}
            {user.blog && (
              <span>
                <FiLink />
                {user.blog}
              </span>
            )}
            {user.twitter_username && (
              <span>
                <FaTwitter />
                {user.twitter_username}
              </span>
            )}
          </div>
        </section>
        <div className={styles.divider} />
        <section className={styles.content}>
          <h2>Repos</h2>
          <ul>
            {repositories.map((repository) => (
              <li key={repository.id}>{repository.name}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
export async function getServerSideProps(ctx: any) {
  const { 'github-token': token } = parseCookies(ctx);
  const { username } = ctx.query;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: user } = await api.get(
    username ? `/users/${username}` : '/user',
    {
      headers: { Authorization: `token ${token}` },
    },
  );

  return {
    props: { user, token },
  };
}
