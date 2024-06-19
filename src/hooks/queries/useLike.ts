import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useLoginModal from '@/store/modal/useLoginModal';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';

const useGetLikePost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(
        `/like?postId=${id}&postType=${postType}`
      );

      return { data, status };
    },
    queryKey: [queryKeys.LIKE, id],
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

const useGetLikeViewPost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/like/count?postId=${id}&postType=${postType}`
      );

      return data;
    },
    queryKey: [queryKeys.LIKE_VIEW, id],
    enabled: Boolean(id),
    select: (response) => {
      if (!response) return;

      return response.data;
    },
  });
};

const useMutateLikePost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(
        `/like?postId=${id}&postType=${postType}`
      );
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        queryClient.setQueryData([queryKeys.LIKE, id], response);

        queryClient.invalidateQueries({
          queryKey: [queryKeys.LIKE_VIEW, id],
        });
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED);
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
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

export { useGetLikePost, useGetLikeViewPost, useMutateLikePost };
