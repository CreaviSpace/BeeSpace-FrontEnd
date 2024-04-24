import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useWriteDelete = (id: number, postType: string) => {
  const queryClient = useQueryClient();
  const token = getCookies('jwt');
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token && !id) {
        return;
      }

      return await axios.delete(`${process.env.BASE_URL}/${postType}/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          router.replace(`/${postType.toLowerCase()}/${id}?type=al;l`);
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: [`${postType}-${id}`] });
      toast.success('글삭제 성공');
    },

    onError: () => {
      toast.error('글삭제 실패');
    },
  });
  return { mutate };
};

export default useWriteDelete;
