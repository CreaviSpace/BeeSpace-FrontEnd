import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 60, // 1시간
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
