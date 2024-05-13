import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';

const useAdminContentGet = (
  postType: string,
  size: number = 3,
  status: boolean,
  sort_type: string
) => {
  const token = getCookies('jwt');

  const { isLoading, data, isFetchingNextPage, isError, hasNextPage } =
    useInfiniteQuery({
      enabled: !!token,
      queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_CONTENT, `${postType}`],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axiosInstance.get(
          `admin/contents/${postType}?size=${size}&page=${pageParam}&status=${status}&sort-type=${sort_type}`
        );

        if (response.status === 200 && response.data.success) {
          return response.data.data;
        } else if (response.status === 202 && !response.data.success) {
          postCookies({
            jwt: response.data.jwt,
            MID: response.data.memberId,
          });
        }
      },
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
