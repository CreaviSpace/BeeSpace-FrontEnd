import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import useLoginModal from '@/store/modal/useLoginModal';
import { ICommunityBody, IProjectBody, IRecruitBody } from '@/types/global';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useWritePost = (
  postType: string,
  data: IProjectBody | IRecruitBody | ICommunityBody
) => {
  const token = getCookies('jwt');
  const router = useRouter();
  const { onOpen } = useLoginModal();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return onOpen();
      }

      return await axiosInstance.post(`/${postType}`, data);
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [postType.toLowerCase()],
          });
          toast.success('글쓰기 성공');
          router.replace(
            `/${data.data.data.postType.toLowerCase() === 'recruit' ? 'recruitment' : data.data.data.postType.toLowerCase()}/${data.data.data.id}`
          );
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.jwt,
            MID: data.data.memberId,
          });
          mutate();
        }
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error('글쓰기 실패');
    },
  });

  return { mutate };
};

export default useWritePost;
