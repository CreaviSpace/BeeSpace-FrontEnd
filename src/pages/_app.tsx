import '@/styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ReportModal from '@/components/modals/ReportModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className="relative h-full">
        <Header />
        <ReportModal />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ChakraProvider>
  );
}
