import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';

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
    queryKey: [queryKeys.PROFILE_CONTENT, postType, String(memberId), category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/member/read/${apiEndpoints}&page=${pageParam}`
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
