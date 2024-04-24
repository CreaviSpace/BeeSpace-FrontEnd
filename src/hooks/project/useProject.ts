import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProject = (category: string, size: number) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!category,
    queryKey: [`project-list-${category}`],
    queryFn: async ({ pageParam = 1 }) => {
      if (!category) {
        return;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/project?size=${size}&page=${pageParam}${category !== 'all' ? `&category=${category}` : ''}`
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

export default useProject;
