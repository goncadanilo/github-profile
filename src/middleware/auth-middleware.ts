import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';

export const authMiddleware = async (context: NextPageContext) => {
  const { 'github-token': token } = parseCookies(context);

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
};
