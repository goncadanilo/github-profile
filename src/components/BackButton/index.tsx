import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

import styles from './styles.module.scss';

export function BackButton() {
  const routes = useRouter();

  return (
    <nav>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => routes.back()}
      >
        <BiArrowBack />
        Voltar
      </button>
    </nav>
  );
}
