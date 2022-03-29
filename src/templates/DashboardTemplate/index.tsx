import { Head } from 'src/components/Head';
import { Header } from 'src/components/Header';

import styles from './styles.module.scss';

interface DashboardTemplateProps {
  children: React.ReactNode;
  title: string | undefined;
}

export function DashboardTemplate({
  children,
  title = 'Dashboard | Github Profile',
}: DashboardTemplateProps) {
  return (
    <>
      <Head title={title} />
      <Header />

      <main className={styles.container}>{children}</main>
    </>
  );
}
