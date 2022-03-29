import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';
import { FaTwitter } from 'react-icons/fa';
import { FiUsers, FiLink, FiMapPin, FiMail } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { BiBuildings } from 'react-icons/bi';

import { Head } from 'src/components/Head';
import { Header } from 'src/components/Header';
import { RepositoryCard } from 'src/components/RepositoryCard';
import { SocialRow } from 'src/components/SocialRow';
import {
  getLoggedUser,
  getUserByUsername,
  getRepositoriesByUsername,
} from 'src/service/github';
import { Repository, User } from 'src/types/github';

import styles from 'src/styles/dashboard.module.scss';

interface DashboardProps {
  username: string | null;
  token: string;
}

export default function Dashboard({ username, token }: DashboardProps) {
  const [user, setUser] = useState<User>({} as User);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data: loggedUser, isLoading } = useQuery(
    ['user'],
    () => getLoggedUser(token),
    { enabled: !username },
  );

  const { data: userData } = useQuery(
    ['user', username],
    () => getUserByUsername(token, username as string),
    { enabled: !!username },
  );

  const { data: repositoriesData } = useQuery(
    ['repositories', username || user?.login],
    () => getRepositoriesByUsername(token, username || user?.login),
    { enabled: !!username || !!user?.login },
  );

  useEffect(() => {
    if (username) {
      setUser(userData);
      return;
    }

    setUser(loggedUser);
  }, [loggedUser, username, userData]);

  useEffect(() => {
    setRepositories(repositoriesData);
  }, [repositoriesData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head title="Dashboard | Github Profile" />

      <Header />

      <main className={styles.container}>
        <section className={styles.hero}>
          <img src={user?.avatar_url} alt={user?.name} />

          <div className={styles.userInfoGroup}>
            <h1>{user?.name}</h1>
            <h3>{user?.login}</h3>
            <p>{user?.bio}</p>
          </div>

          <div className={styles.followersGroup}>
            <p>
              <FiUsers />
              <p>{user?.followers}</p> seguidores
            </p>
            <p>
              <BsDot />
              <p>{user?.following}</p> seguindo
            </p>
          </div>

          <div className={styles.socialGroup}>
            <SocialRow icon={<BiBuildings />}>{user?.company}</SocialRow>
            <SocialRow icon={<FiMapPin />}>{user?.location}</SocialRow>
            <SocialRow icon={<FiMail />}>{user?.email}</SocialRow>
            <SocialRow icon={<FiLink />}>{user?.blog}</SocialRow>
            <SocialRow icon={<FaTwitter />}>{user?.twitter_username}</SocialRow>
          </div>
        </section>
        <div className={styles.divider} />
        <section className={styles.content}>
          <h2>Repositórios</h2>

          <div className={styles.contentList}>
            {repositories?.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
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

  return {
    props: { username: username || null, token },
  };
}
