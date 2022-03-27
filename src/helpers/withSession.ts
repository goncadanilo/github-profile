import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export const withSession = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
