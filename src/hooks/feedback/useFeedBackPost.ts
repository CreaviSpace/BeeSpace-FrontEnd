import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { IAnswerType, IQuestionType } from '@/types/global';
import { getCookies } from '@/utils/getCookies';

const useFeedBackPost = (
  id: number,
  data: IQuestionType[] | IAnswerType[],
  type: string
) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/feedback/${type}?projectId=${id}`,
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
