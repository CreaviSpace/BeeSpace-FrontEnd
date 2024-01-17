import '@/styles/globals.css';

import { AppProps } from 'next/app';

import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header></Header>
      <Component {...pageProps} />
    </div>
  );
}
