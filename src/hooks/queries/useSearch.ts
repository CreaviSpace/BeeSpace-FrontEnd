import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';
import useDebounce from '../useDebounce';

const useGetInfiniteSearchPosts = (
  size: number,
  text: string,
  type: string
) => {
  const axiosInstance = useAxiosInstance();

  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInstance.get(
        `/search?size=${size}&page=${pageParam}&text=${text}${type !== 'all' ? `&postType=${type.toUpperCase()}` : ''}`
      );

      return data.data;
    },
    queryKey: [queryKeys.SEARCH, type, text],
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

const useGetSearchMember = (value: string) => {
  const axiosInstance = useAxiosInstance();
  const debouncedValue = useDebounce(value, 300);
  const { getCookies, setCookies } = useCookie(['jwt']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(
        `/member/search?search=${debouncedValue}`
      );

      return { data, status };
    },
    queryKey: [queryKeys.MEMBER_SEARCH, debouncedValue],
    enabled: debouncedValue.trim() !== '' && Boolean(getCookies('jwt')),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        // toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
        //   onClose: () =>
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
        // });
      }

      return response.data.data;
    },
  });
};

const useGetSearchSkillStack = (text: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(`/techStack`);

      return { data, status };
    },
    queryKey: [queryKeys.TEACH_STACK],
    enabled: Boolean(getCookies('jwt')),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        // toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
        //   onClose: () =>
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
        // });
      }

      return response.data.data;
    },
  });
};

export {
  useGetInfiniteSearchPosts,
  useGetSearchMember,
  useGetSearchSkillStack,
};
