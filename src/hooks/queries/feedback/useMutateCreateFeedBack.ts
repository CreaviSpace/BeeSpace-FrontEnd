import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages, successMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';
import useLoginModal from '@/store/modal/useLoginModal';
import { IAnswerType, IQuestionType } from '@/types/global';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

const useMutateCreateFeedBack = (
  id: number,
  data: IQuestionType[] | IAnswerType[],
  type: string
) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(
        `/feedback/${type}?projectId=${id}`,
        data
      );
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.FEEDBACK, id, type],
        });

        toast.success(successMessages.FEEDBACK_UPDATE, {
          onClose: () => {
            if (type === 'question') {
              router.replace(`/feedback/analysis/${id}`);
            } else if (type === 'answer') {
              router.replace(`/project/${id}`);
            }
          },
        });
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: async () => {
            setCookies({
              jwt: response.data.jwt,
              MID: response.data.memberId,
            });
            router.back();
          },
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

export default useMutateCreateFeedBack;
