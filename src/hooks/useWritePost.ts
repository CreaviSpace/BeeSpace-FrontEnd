import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ICommunityBody, IProjectBody, IRecruitBody } from '@/types/global';
import { getCookies } from '@/utils/getCookies';

const useWritePost = (
  postType: string,
  data: IProjectBody | IRecruitBody | ICommunityBody
) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.BASE_URL}/${postType}`, data, {
        headers: {
          Authorization: getCookies('jwt'),
        },
      });
    },

    onSuccess: () => {
      toast.success('글쓰기 성공');
    },
    onError: () => {
      toast.error('글쓰기 실패');
    },
  });

  return { mutate };
};

export default useWritePost;
