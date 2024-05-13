import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';

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
    queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_MEMBER],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/admin/${type}?size=${size}&page=${pageParam}&sort-type=${sort}`
      );

      if (response.status === 200 && response.data) {
        return response.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },

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
