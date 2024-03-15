import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSearch = (size: number, page: number, text: string, type: string) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`search-${page}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/search?size=${size}&page=${page}&text=${text}&type=${type}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000,
    staleTime: 30000,
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

export default useSearch;
