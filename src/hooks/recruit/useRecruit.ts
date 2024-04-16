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
    queryKey: [`recruit-list-${category}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/recruit?size=${size}&page=${pageParam}${category === 'all' ? '' : `&category=${category}`}`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      if (!lastPage) {
        return null;
      }
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

export default useRecruit;
