// 프로젝트, 모집, 커뮤니티 등의 게시글과 북마크, 좋아요

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useLoginModal from '@/store/modal/useLoginModal';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';

const useGetBookmarkPost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(
        `/bookmark?postId=${id}&postType=${postType}`
      );

      return { data, status };
    },
    queryKey: [queryKeys.BOOKMARK, id],
    enabled: Boolean(id) && Boolean(getCookies('jwt')),
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

const useMutateBookmarkPost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(
        `/bookmark?postId=${id}&postType=${postType}`
      );
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        queryClient.setQueryData([queryKeys.BOOKMARK, id], response);

        queryClient.invalidateQueries({
          queryKey: [queryKeys.PROFILE_CONTENT, postType?.toLowerCase()],
        });
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: () =>
            setCookies({
              jwt: response.data.jwt,
              MID: response.data.memberId,
            }),
        });
      }
    },
    onError: (error) => {
      queryOnError(getCookies('jwt'), error);
    },
    onSettled: () => {
      if (!getCookies('jwt')) return onOpen();
    },
  });
};

function useBookmark() {
  return { useGetBookmarkPost, useMutateBookmarkPost };
}

export default useBookmark;
