import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import useReportModal from '@/store/modal/useReportModal';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

interface IuseReportPostProps {
  postId: number;
  postType: string;
  category: string;
  content: string;
}

const useReportPost = (data: IuseReportPostProps) => {
  const { onClose } = useReportModal();
  const token = getCookies('jwt');

  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return await axiosInstance.post(`/report`, data);
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          toast.success('신고 성공');
          queryClient.invalidateQueries({
            queryKey: [[queryKeys.ADMIN, queryKeys.ADMIN_CONTENT, 'report']],
          });
          onClose();
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.jwt,
            MID: data.data.memberId,
          });
        }
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error('에러');
    },
  });

  return { mutate, isSuccess };
};

export default useReportPost;
