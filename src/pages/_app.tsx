/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';

import 'src/styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
