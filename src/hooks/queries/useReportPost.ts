import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages, successMessages } from '@/constants/messages';
import useLoginModal from '@/store/modal/useLoginModal';
import useReportModal from '@/store/modal/useReportModal';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';

interface IuseReportPostProps {
  postId: number;
  postType: string;
  category: string;
  content: string;
}

const useMutateReportPost = (data: IuseReportPostProps) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onClose } = useReportModal();
  const { onOpen } = useLoginModal();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`/report`, data);
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        toast.success(successMessages.REPORT_CREATE);

        queryClient.invalidateQueries({
          queryKey: [
            [queryKeys.ADMIN, queryKeys.ADMIN_CONTENT, queryKeys.ADMIN_REPORT],
          ],
        });
        onClose();
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: () => {
            setCookies({
              jwt: response.data.jwt,
              MID: response.data.memberId,
            });
            onClose();
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

  return { mutate, isSuccess };
};

export default useMutateReportPost;
