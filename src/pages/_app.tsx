import '@/styles/globals.css';

import { AppProps } from 'next/app';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-full">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
