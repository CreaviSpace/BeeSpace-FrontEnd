import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { ICommunityBody, IProjectBody, IRecruitBody } from '@/types/global';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useWritePost = (
  postType: string,
  data: IProjectBody | IRecruitBody | ICommunityBody
) => {
  const token = getCookies('jwt');
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return await axios.post(`${process.env.BASE_URL}/${postType}`, data, {
        headers: {
          Authorization: token,
        },
      });
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          router.replace(
            `/${data.data.data.postType.toLowerCase()}/${data.data.data.id}`
          );
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }

      toast.success('글쓰기 성공');
    },
    onError: () => {
      toast.error('글쓰기 실패');
    },
  });

  return { mutate };
};

export default useWritePost;
