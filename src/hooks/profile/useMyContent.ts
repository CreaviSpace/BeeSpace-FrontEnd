import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useMyContent = (
  memberId: string,
  size: number,
  postType: string,
  sortType: string,
  category: string
) => {
  const token = getCookies('jwt');
  const apiEndpoints =
    category === 'project'
      ? `contents/${postType}?member-id=${memberId}&size=${size}&sort-type=${sortType}`
      : `${category}?member-id=${memberId}&size=${size}&sort-type=${sortType}&category=${postType}`;

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!memberId && !!token,
    queryKey: [`MyContent-${postType}-${category}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/${apiEndpoints}&page=${pageParam}`,
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

export default useMyContent;
