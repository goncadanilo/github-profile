import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';
import { FaRegStar, FaTwitter } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { FiUsers, FiLink, FiMapPin, FiMail } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { BiBookBookmark, BiBuildings, BiGitRepoForked } from 'react-icons/bi';

import { Head } from 'src/components/Head';
import { Header } from 'src/components/Header';
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
            <span>
              <FiUsers />
              <span>{user?.followers}</span> seguidores
            </span>
            <span>
              <BsDot />
              <span>{user?.following}</span> seguindo
            </span>
          </div>

          <div className={styles.socialGroup}>
            {user?.company && (
              <span>
                <BiBuildings />
                {user?.company}
              </span>
            )}
            {user?.location && (
              <span>
                <FiMapPin />
                {user.location}
              </span>
            )}
            {user?.email && (
              <span>
                <FiMail />
                {user.email}
              </span>
            )}
            {user?.blog && (
              <span>
                <FiLink />
                {user.blog}
              </span>
            )}
            {user?.twitter_username && (
              <span>
                <FaTwitter />
                {user.twitter_username}
              </span>
            )}
          </div>
        </section>
        <div className={styles.divider} />
        <section className={styles.content}>
          <h2>Repositórios</h2>

          <div className={styles.contentList}>
            {repositories?.map((repository) => (
              <div className={styles.repositoryItem}>
                <a href={repository.html_url}>
                  <BiBookBookmark />
                  {repository.name}
                </a>

                <p>{repository.description}</p>

                <div className={styles.repositoryInfo}>
                  <p>
                    <FaRegStar />
                    {repository.stargazers_count}
                  </p>

                  <p>
                    <BiGitRepoForked />
                    {repository.forks}
                  </p>

                  {repository.language && (
                    <p>
                      <HiCode />
                      {}
                      {repository.language}
                    </p>
                  )}
                </div>
              </div>
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
