import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseCookies } from 'nookies';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { UserDetails } from 'src/components/UserDetails';
import { getUserByUsername } from 'src/service/github';
import { User } from 'src/types/github';

import { useRouter } from 'next/router';

interface UserFoundPageProps {
  token: string;
}

export default function UserFoundPage({ token }: UserFoundPageProps) {
  const routes = useRouter();
  const { username } = routes.query;

  const [user, setUser] = useState<User>({} as User);

  const { data: userData } = useQuery(
    ['user', username],
    () => getUserByUsername(token, username as string),
    { enabled: !!username },
  );

  useEffect(() => {
    setUser(userData);
  }, [username, userData]);

  return (
    <DashboardTemplate title={`${user?.name || user?.login} | Github Profile`}>
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
