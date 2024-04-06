import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMemberContents = (
  memberId: number,
  size: number,
  postType: string,
  sortType: string
) => {
  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`MyContent-list-${memberId}`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/contents/${postType}?member-id=${memberId}&size=${size}&page=${pageParam}&sort-type=${sortType}`
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

export default useMemberContents;
