import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { RepositoryList } from 'src/components/RepositoryList';
import { LoadingScreen } from 'src/components/LoadingScreen';
import { authMiddleware } from 'src/middleware/auth-middleware';
import { getRepositoriesByUsername } from 'src/service/github';
import { Repository } from 'src/types/github';

interface RepositoriesPageProps {
  token: string;
}

export default function RepositoriesPage({ token }: RepositoriesPageProps) {
  const routes = useRouter();
  const { username } = routes.query;

  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { data: repositoriesData, isLoading } = useQuery(
    ['repos', username],
    () => getRepositoriesByUsername(token, username as string),
  );

  useEffect(() => {
    setRepositories(repositoriesData);
  }, [repositoriesData]);

  return (
    <DashboardTemplate title={`Repos | ${username}`}>
      {isLoading ? (
        <LoadingScreen loading={isLoading} />
      ) : (
        <RepositoryList
          title={`Repositórios - ${username}`}
          repositories={repositories}
        />
      )}
    </DashboardTemplate>
  );
}

export const getServerSideProps = authMiddleware;
