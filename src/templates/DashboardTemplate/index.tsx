import { Head } from 'src/components/Head';
import { Header } from 'src/components/Header';

interface DashboardTemplateProps {
  children: React.ReactNode;
  title: string;
}
export function DashboardTemplate({ children, title }: DashboardTemplateProps) {
  return (
    <>
      <Head title={title} />
      <Header />

      {children}
    </>
  );
}
