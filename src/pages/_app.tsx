import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LogInModal from '@/components/modals/LogInModal';
import ReconfirmModal from '@/components/modals/ReconfirmModal';
import ReportModal from '@/components/modals/ReportModal';
import SearchErrorModal from '@/components/modals/SearchErrorModal';
import SignUpModal from '@/components/modals/SignUpModal';
import queryClient from '@/utils/queryClien';

import Loading from './loading';

const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="relative h-full min-w-min_w">
          <Header />
          <ReportModal />
          <LogInModal />
          <SignUpModal />
          <ReconfirmModal />
          <SearchErrorModal />
          <Suspense fallback={<Loading />}>
            <Component {...pageProps} />
          </Suspense>
          <Footer />
        </div>
        <ToastContainer position="top-center" />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
