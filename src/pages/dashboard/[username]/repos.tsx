import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { RepositoryList } from 'src/components/RepositoryList';
import { getRepositoriesByUsername } from 'src/service/github';
import { Repository } from 'src/types/github';

interface RepositoriesPageProps {
  token: string;
}

export default function RepositoriesPage({ token }: RepositoriesPageProps) {
  const routes = useRouter();
  const { username } = routes.query;

  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data: repositoriesData } = useQuery(['user', username], () => {
    return getRepositoriesByUsername(token, username as string);
  });

  useEffect(() => {
    setRepositories(repositoriesData);
  }, [repositoriesData]);

  return (
    <DashboardTemplate title="Repositórios">
      <RepositoryList
        title={`Repositórios - ${username}`}
        repositories={repositories}
      />
    </DashboardTemplate>
  );
}

export async function getServerSideProps(ctx: any) {
  const { 'github-token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}
