import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAdmin = (size: number, sort: string, type: string) => {
  const token = getCookies('jwt');

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!token,
    queryKey: [`admin-member`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/admin/${type}?size=${size}&page=${pageParam}&sort-type=${sort}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200 && response.data) {
        return response.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      }
    },
    staleTime: 30000 * 12,
    gcTime: 30000 * 12,

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return null;
      }
      const nextPage = allPages.length + 1;
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

export default useAdmin;
