import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { FaGithub } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';

import styles from './styles.module.scss';

export function Header() {
  const routes = useRouter();
  const [username, setUsername] = useState('');

  function handleSignOut() {
    destroyCookie(undefined, 'github-token');
    routes.replace('/');
  }

  function handleSearch(event: any) {
    event.preventDefault();

    if (username.trim()) {
      setUsername('');
      routes.push(`?username=${username}`);
    }
  }

  return (
    <header className={styles.header}>
      <h1>
        <FaGithub />
        <Link href="/">Github Profile</Link>
      </h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </form>

      <button
        type="button"
        className={styles.signOutButton}
        onClick={handleSignOut}
        title="Sair"
      >
        <span>Sair</span>
        <GoSignOut />
      </button>
    </header>
  );
}
