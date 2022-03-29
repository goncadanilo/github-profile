import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { UserDetails } from 'src/components/UserDetails';
import { authMiddleware } from 'src/middleware/auth-middleware';
import { getUserByUsername } from 'src/service/github';
import { User } from 'src/types/github';

interface UserFoundPageProps {
  token: string;
}

export default function UserFoundPage({ token }: UserFoundPageProps) {
  const routes = useRouter();
  const { username } = routes.query;

  const [user, setUser] = useState<User>({} as User);

  const { data: userData, isLoading } = useQuery(['user', username], () => {
    return getUserByUsername(token, username as string);
  });

  useEffect(() => {
    setUser(userData);
  }, [username, userData]);

  if (!userData && !isLoading) {
    return (
      <DashboardTemplate title="Not Found">
        <h1>Not Found</h1>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate title={user?.name || user?.login}>
      {isLoading ? <h1>Loading...</h1> : <UserDetails user={user} />}
    </DashboardTemplate>
  );
}

export const getServerSideProps = authMiddleware;
