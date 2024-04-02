import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { IQuestionType } from '@/types/global';
import { getCookies } from '@/utils/getCookies';

const useFeedBackPost = (id: number, data: IQuestionType[]) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/feedback/question?projectId=${id}`,
        data,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
    },
    onSuccess: () => {},
    onError: () => {
      toast.error('에러 발생');
    },
  });
  return { mutate };
};

export default useFeedBackPost;
