import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { FaGithub } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';

import styles from './styles.module.scss';

export function Header() {
  const routes = useRouter();

  function handleSignOut() {
    destroyCookie(undefined, 'github-token');
    routes.replace('/');
  }

  return (
    <header className={styles.header}>
      <h1>
        <FaGithub />
        Github Profile
      </h1>

      <form>
        <input type="text" placeholder="Buscar por username" name="username" />
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
