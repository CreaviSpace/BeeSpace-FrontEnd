import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { errorMessages, successMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';
import useLoginModal from '@/store/modal/useLoginModal';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

const useMutateDeletePost = (id: number, postType: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(`/${postType}/${id}`);
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        queryClient.invalidateQueries({
          queryKey: [postType.toLowerCase()],
        });

        queryClient.invalidateQueries({
          queryKey: [postType.toLowerCase() + '_detail', String(id)],
        });

        toast.success(successMessages.POST_UPDATE, {
          onClose: () =>
            router.replace(
              `/${response.data.data.postType.toLowerCase() === 'recruit' ? 'recruitment' : response.data.data.postType.toLowerCase()}?type=all`
            ),
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

export default useMutateDeletePost;
