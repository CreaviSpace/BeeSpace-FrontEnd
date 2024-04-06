import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

interface IReportProps {
  postId: number;
  postType: string;
  category: string;
  content: string;
}

const useReport = (data: IReportProps) => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.BASE_URL}/report`, data, {
        headers: { Authorization: getCookies('jwt') },
      });
    },
    onSuccess: () => {},
    onError: () => {
      toast.error('에러');
    },
  });

  return { mutate, isSuccess };
};

export default useReport;
