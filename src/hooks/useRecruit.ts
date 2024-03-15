import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRecruit = (postType: string) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`project-list-${postType}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/recruit?size=${12}&page=${pageParam}&category=${postType}`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
