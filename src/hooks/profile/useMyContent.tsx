import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useMyContent = (
  memberId: string,
  size: number,
  postType: string,
  sortType: string,
  category: string
) => {
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
    enabled: !!memberId,
    queryKey: [`MyContent-${postType}`, apiEndpoints],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/${apiEndpoints}&page=${pageParam}`,
        { headers: { Authorization: getCookies('jwt') } }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error);
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
