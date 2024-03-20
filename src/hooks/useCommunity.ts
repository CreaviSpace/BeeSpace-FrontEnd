import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCommunity = (category: string, hashTag: string) => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`community-list-${category}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/community?size=${6}&page=${pageParam}&category=${category}&hashTag=${hashTag}`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 6, // 30분
    gcTime: 30000 * 6, // 30분
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.nextCursor) {
        return lastPage.nextCursor;
      } else {
        return null;
      }
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

export default useCommunity;
