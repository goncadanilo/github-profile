import Link from 'next/link';
import { BiBuildings } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';
import { FiLink, FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import { SocialRow } from 'src/components/SocialRow';
import { User } from 'src/types/github';

import styles from './styles.module.scss';

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <img src={user?.avatar_url} alt={user?.name} />

        <div className={styles.userInfoGroup}>
          <div>
            <h1>{user?.name}</h1>
            <h3>{user?.login}</h3>
            <p>{user?.bio}</p>

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
          </div>

          <div className={styles.socialGroup}>
            <SocialRow icon={<BiBuildings />}>{user?.company}</SocialRow>
            <SocialRow icon={<FiMapPin />}>{user?.location}</SocialRow>
            <SocialRow icon={<FiMail />}>{user?.email}</SocialRow>
            <SocialRow icon={<FiLink />}>{user?.blog}</SocialRow>
            <SocialRow icon={<FaTwitter />}>{user?.twitter_username}</SocialRow>
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <nav>
          <Link href={`/dashboard/${user?.login}/repos`}>Repositórios</Link>
          <Link href={`/dashboard/${user?.login}/stars`}>Stars</Link>
        </nav>
      </section>
    </main>
  );
}
