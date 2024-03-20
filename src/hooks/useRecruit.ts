import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRecruit = (category: string, size: number) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`project-list-${category}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/recruit?size=${size}&page=${pageParam}&category=${category}`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
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

export default useRecruit;
