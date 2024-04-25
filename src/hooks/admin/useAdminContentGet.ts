import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

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
      queryKey: [`admin-content-${postType}`],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `${process.env.BASE_URL}/admin/contents/${postType}?size=${size}&page=${pageParam}&status=${status}&sort-type=${sort_type}`,
          { headers: { Authorization: token } }
        );

        if (response.status === 200 && response.data.success) {
          return response.data.data;
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
