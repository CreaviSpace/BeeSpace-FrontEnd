import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCommunity = (
  category: string,
  size: number,
  hashTag: string | undefined,
  orderby?: string | undefined
) => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!category,
    queryKey: [`community-list-${category}-${orderby}-${size}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/community?size=${size}&page=${pageParam}${category !== 'all' ? `&category=${category}` : ''}${hashTag ? `&hashTag=${hashTag} ` : ''}${orderby ? `&sort=${orderby}` : ''}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 12,
    gcTime: 30000 * 12,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (!lastPage) {
        return null;
      }

      return lastPage?.length === 0 || lastPage?.length < size
        ? undefined
        : nextPage - 1;
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
