import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { errorMessages } from '@/constants/messages';
import useLoginModal from '@/store/modal/useLoginModal';
import { queryOnError } from '@/utils/queryOnError';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';

const useMutateCreateImage = () => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();

  return useMutation({
    mutationFn: async (formData: FormData | undefined) => {
      const { data, status } = await axiosInstance.post(
        `/file/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return { data, status };
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
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

export { useMutateCreateImage };
