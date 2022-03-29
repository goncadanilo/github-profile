import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface SocialRowProps {
  icon: ReactNode;
  children: ReactNode;
}

export function SocialRow({ icon, children }: SocialRowProps) {
  return children ? (
    <p className={styles.text}>
      {icon} {children}
    </p>
  ) : (
    <p />
  );
}
