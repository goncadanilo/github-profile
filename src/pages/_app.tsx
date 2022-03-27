/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import 'src/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </NextAuthProvider>
  );
}

export default MyApp;
