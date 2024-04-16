import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useAdminContentGet = (postType: string, size: number = 3) => {
  const { isLoading, data, isFetchingNextPage, isError, hasNextPage } =
    useInfiniteQuery({
      queryKey: [`admin-content-${postType}`],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `${process.env.BASE_URL}/admin/contents/${postType}?size=${size}&page=${pageParam}`,
          { headers: { Authorization: getCookies('jwt') } }
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
  return { isLoading, data, isFetchingNextPage, isError, hasNextPage };
};
export default useAdminContentGet;
