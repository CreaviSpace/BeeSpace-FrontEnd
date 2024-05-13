import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { IAnswerType, IQuestionType } from '@/types/global';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useFeedBackPost = (
  id: number,
  data: IQuestionType[] | IAnswerType[],
  type: string
) => {
  const token = getCookies('jwt');
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return await axiosInstance.post(
        `/feedback/${type}?projectId=${id}`,
        data
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.FEEDBACK, id, type],
          });
          if (type === 'question') {
            router.replace(`/feedback/analysis/${id}`);
          } else if (type === 'answer') {
            router.replace(`/project/${id}`);
          }
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
      toast.error('에러 발생');
    },
  });
  return { mutate };
};

export default useFeedBackPost;
