import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { IAnswerType, IQuestionType } from '@/types/global';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useFeedBackPost = (
  id: number,
  data: IQuestionType[] | IAnswerType[],
  type: string
) => {
  const token = getCookies('jwt');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return await axios.post(
        `${process.env.BASE_URL}/feedback/${type}?projectId=${id}`,
        data,
        {
          headers: { Authorization: token },
        }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`feedback-${id}`] });
          if (type === 'question') {
            router.replace(`/feedback/analysis/${id}`);
          } else if (type === 'answer') {
            router.replace(`/project/${id}`);
          }
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
      toast.error('에러 발생');
    },
  });
  return { mutate };
};

export default useFeedBackPost;
