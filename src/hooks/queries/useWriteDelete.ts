import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useWriteDelete = (id: number, postType: string) => {
  const token = getCookies('jwt');
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token && !id) {
        return;
      }

      return await axiosInstance.delete(`/${postType}/${id}`);
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          toast.success('글삭제 성공');
          queryClient.invalidateQueries({
            queryKey: [postType.toLowerCase()],
          });
          queryClient.invalidateQueries({
            queryKey: [postType.toLowerCase() + '_detail', String(id)],
          });
          router.replace(
            `/${data.data.data.postType.toLowerCase() === 'recruit' ? 'recruitment' : data.data.data.postType.toLowerCase()}?type=all`
          );
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
      toast.error('글삭제 실패');
    },
  });
  return { mutate };
};

export default useWriteDelete;
