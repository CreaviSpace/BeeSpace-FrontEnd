import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LogInModal from '@/components/modals/LogInModal';
import ReconfirmModal from '@/components/modals/ReconfirmModal';
import ReportModal from '@/components/modals/ReportModal';
import SearchErrorModal from '@/components/modals/SearchErrorModal';
import SignUpModal from '@/components/modals/SignUpModal';
import UserStamctionModal from '@/components/modals/UserSanctionModal';
import queryClient from '@/utils/queryClien';

import Loading from './loading';

const ToastContainer = dynamic(
  () => import('react-toastify').then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const start = () => {
      // 시작 시 타이머 설정
      timer = setTimeout(() => {
        setLoading(true);
      }, 500); // 1초 후에 로딩 상태를 설정
    };

    const end = () => {
      // 끝나면 타이머 클리어
      clearTimeout(timer);
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
      clearTimeout(timer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="relative min-h-min_h min-w-min_w">
          <Header />
          <ReportModal />
          <LogInModal />
          <SignUpModal />
          <ReconfirmModal />
          <SearchErrorModal />
          <UserStamctionModal />
          {loading ? (
            <Loading />
          ) : (
            <Suspense fallback={<Loading />}>
              <Component {...pageProps} />
            </Suspense>
          )}
          <Footer />
        </div>
        <ToastContainer position="top-center" />
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
