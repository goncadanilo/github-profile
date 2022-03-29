import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { RepositoryList } from 'src/components/RepositoryList';
import { LoadingScreen } from 'src/components/LoadingScreen';
import { authMiddleware } from 'src/middleware/auth-middleware';
import { getStarredByUsername } from 'src/service/github';
import { Repository } from 'src/types/github';

interface StarsPageProps {
  token: string;
}

export default function StarsPage({ token }: StarsPageProps) {
  const routes = useRouter();
  const { username } = routes.query;

  const [stars, setStars] = useState<Repository[]>([]);

  const { data: starsData, isLoading } = useQuery(['starred', username], () => {
    return getStarredByUsername(token, username as string);
  });

  useEffect(() => {
    setStars(starsData);
  }, [starsData]);

  return (
    <DashboardTemplate title={`Stars | ${username}`}>
      {isLoading ? (
        <LoadingScreen loading={isLoading} />
      ) : (
        <RepositoryList
          title={`Stars - ${username}`}
          repositories={stars}
          displayOwner
        />
      )}
    </DashboardTemplate>
  );
}

export const getServerSideProps = authMiddleware;
