import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import useReportModal from '@/store/useReportModal';
import { getCookies } from '@/utils/getCookies';

interface IuseReportPostProps {
  postId: number;
  postType: string;
  category: string;
  content: string;
}

const useReportPost = (data: IuseReportPostProps) => {
  const { onClose } = useReportModal();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.BASE_URL}/report`, data, {
        headers: { Authorization: getCookies('jwt') },
      });
    },
    onSuccess: () => {
      toast.success('신고 성공');
      onClose();
    },
    onError: () => {
      toast.error('에러');
    },
  });

  return { mutate, isSuccess };
};

export default useReportPost;
