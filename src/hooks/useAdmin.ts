import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useAdmin = (size: number, sort: string, type: string) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`admin-member`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/admin/${type}?size=${size}&page=${pageParam}&sort-type=${sort}`,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );

      if (response.data) {
        return response.data;
      }
    },
    staleTime: 30000 * 6, // 30분
    gcTime: 30000 * 6, // 30분
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return null;
      }
      const nextPage = allPages.length + 1;
      return lastPage?.length === 0 || lastPage?.length < size
        ? undefined
        : nextPage;
    },
  });

  return {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useAdmin;
