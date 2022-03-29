import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { RepositoryList } from 'src/components/RepositoryList';
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
        <h1>Loading...</h1>
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
