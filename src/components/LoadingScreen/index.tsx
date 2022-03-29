import { HashLoader } from 'react-spinners';

import styles from './styles.module.scss';

interface LoadingScreenProps {
  loading: boolean;
}

export function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <div className={styles.container}>
      <HashLoader color="#8b949e" loading={loading} size={80} />
    </div>
  );
}
