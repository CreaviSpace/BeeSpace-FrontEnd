import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSearch = (size: number, text: string, type: string) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: text?.trim() !== '',
    queryKey: [`search-${type}-${text}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/search?size=${size}&page=${pageParam}&text=${text}${type !== 'all' ? `&postType=${type.toUpperCase()}` : ''}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000 * 6,
    staleTime: 30000 * 6,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (!lastPage) {
        return null;
      }

      return lastPage.length === 0 || lastPage?.length < size
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

export default useSearch;
