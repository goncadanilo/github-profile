import { signOut } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';

import styles from './styles.module.scss';

interface HeaderProps {
  user: {
    name: string;
    image: string;
  };
}

export function Header({ user }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>
          <FaGithub />
          Github Profile
        </h1>
        <button
          type="button"
          className={styles.signOutButton}
          onClick={() => signOut()}
          title="Sair"
        >
          <img src={user.image} alt={user.name} />
          <span>{user.name}</span>
          <GoSignOut />
        </button>
      </div>
    </header>
  );
}
