import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const useGetInfiniteAdminPosts = (
  postType: string,
  size: number = 3,
  isStatus: boolean,
  sort_type: string
) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const router = useRouter();

  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const { data, status } = await axiosInstance.get(
        `admin/contents/${postType}?size=${size}&page=${pageParam}&status=${isStatus}&sort-type=${sort_type}`
      );

      if (status === 202 && !data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: () => {
            setCookies({
              jwt: data.jwt,
              MID: data.memberId,
            });
            router.back();
          },
        });
      }

      return data.data;
    },
    queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_CONTENT, `${postType}`],
    enabled: Boolean(getCookies('jwt')),
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

export default useGetInfiniteAdminPosts;
