import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import useReportModal from '@/store/modal/useReportModal';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

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

      return await axios.post(`${process.env.BASE_URL}/report`, data, {
        headers: { Authorization: token },
      });
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          toast.success('신고 성공');
          onClose();
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
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
