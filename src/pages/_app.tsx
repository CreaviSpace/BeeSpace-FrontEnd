import '@/styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ReconfirmModal from '@/components/modals/ReconfirmModal';
import ReportModal from '@/components/modals/ReportModal';
import SearchErrorModal from '@/components/modals/SearchErrorModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className="relative h-full">
        <Header />
        <ReportModal />
        <ReconfirmModal value="계정" />
        <SearchErrorModal />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ChakraProvider>
  );
}
