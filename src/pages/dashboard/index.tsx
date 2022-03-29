import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { UserDetails } from 'src/components/UserDetails';
import { LoadingScreen } from 'src/components/LoadingScreen';
import { authMiddleware } from 'src/middleware/auth-middleware';
import { getLoggedUser } from 'src/service/github';
import { User } from 'src/types/github';

interface DashboardPageProps {
  token: string;
}

export default function DashboardPage({ token }: DashboardPageProps) {
  const [user, setUser] = useState<User>({} as User);

  const { data: loggedUser, isLoading } = useQuery(['user'], () => {
    return getLoggedUser(token);
  });

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser]);

  return (
    <DashboardTemplate title={user?.name || user?.login}>
      {isLoading ? (
        <LoadingScreen loading={isLoading} />
      ) : (
        <UserDetails user={user} />
      )}
    </DashboardTemplate>
  );
}

export const getServerSideProps = authMiddleware;
