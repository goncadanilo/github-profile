import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';
import { FaTwitter } from 'react-icons/fa';
import { FiUsers, FiLink, FiMapPin, FiMail } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';
import { BiBuildings } from 'react-icons/bi';

import { Head } from 'src/components/Head';
import { Header } from 'src/components/Header';
import { fetchLoggedUser, fetchUserByUsername } from 'src/service/github';
import { User } from 'src/types/github';

import styles from 'src/styles/dashboard.module.scss';

interface DashboardProps {
  username: string | null;
  token: string;
}

export default function Dashboard({ username, token }: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);

  const { data: loggedUser, isLoading } = useQuery(
    ['user'],
    () => fetchLoggedUser(token),
    { enabled: !username },
  );

  const { data: userData } = useQuery(
    ['user', username],
    () => fetchUserByUsername(token, username as string),
    { enabled: !!username },
  );

  useEffect(() => {
    if (username) {
      setUser(userData);
      return;
    }

    setUser(loggedUser);
  }, [loggedUser, username, userData]);

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
                {user?.location}
              </span>
            )}
            {user?.email && (
              <span>
                <FiMail />
                {user?.email}
              </span>
            )}
            {user?.blog && (
              <span>
                <FiLink />
                {user?.blog}
              </span>
            )}
            {user?.twitter_username && (
              <span>
                <FaTwitter />
                {user?.twitter_username}
              </span>
            )}
          </div>
        </section>
        <div className={styles.divider} />
        <section className={styles.content}>
          <h2>{username}</h2>
          {/* <ul>
            {repositories.map((repository) => (
              <li key={repository.id}>{repository.name}</li>
            ))}
          </ul> */}
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
