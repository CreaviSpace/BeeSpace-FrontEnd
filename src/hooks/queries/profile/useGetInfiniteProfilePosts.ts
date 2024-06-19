import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const apiEndPoinsts = (
  memberId: string,
  size: number,
  postType: string,
  sortType: string,
  category: string
) => {
  if (category === 'project') {
    return `contents/${postType}?member-id=${memberId}&size=${size}&sort-type=${sortType}`;
  } else {
    return `${category}?member-id=${memberId}&size=${size}&sort-type=${sortType}&category=${postType}`;
  }
};

const useGetInfiniteProfilePosts = (
  memberId: string,
  size: number,
  postType: string,
  sortType: string,
  category: string
) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);

  const API_ENDPONIT = apiEndPoinsts(
    memberId,
    size,
    postType,
    sortType,
    category
  );

  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const { data, status } = await axiosInstance.get(
        `/member/read/${API_ENDPONIT}&page=${pageParam}`
      );

      if (status === 202 && !data.success) {
        // toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
        //   onClose: () =>
        setCookies({
          jwt: data.jwt,
          MID: data.memberId,
        });
        // });
      }

      return data.data;
    },
    queryKey: [queryKeys.PROFILE_CONTENT, postType, String(memberId), category],
    enabled: Boolean(memberId),
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
};

export default useGetInfiniteProfilePosts;
