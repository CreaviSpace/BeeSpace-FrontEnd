import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProject = (kind: string, size?: number, page?: number) => {
  const { isError, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`project-list-${kind}`],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `${process.env.BASE_URL}/project?size=${16}&page=${pageParam}&kind=${kind}`
        );
        if (response.data.success) {
          return response.data.data;
        }
      },
      staleTime: 30000 * 6, // 30분
      gcTime: 30000 * 6, // 30분
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  return {
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useProject;
