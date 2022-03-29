import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { UserDetails } from 'src/components/UserDetails';
import { getLoggedUser } from 'src/service/github';
import { User } from 'src/types/github';

interface DashboardProps {
  token: string;
}

export default function Dashboard({ token }: DashboardProps) {
  const [user, setUser] = useState<User>({} as User);

  const { data: loggedUser } = useQuery(['user'], () => {
    return getLoggedUser(token);
  });

  useEffect(() => {
    setUser(loggedUser);
  }, [loggedUser]);

  return (
    <DashboardTemplate title="Dashboard | Github Profile">
      <UserDetails user={user} />
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
