import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAdminContentsDelete = (id: number, category: string) => {
  const token = getCookies('jwt');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }
      return await axios.post(
        `${process.env.BASE_URL}/admin/contents/delete`,
        { id: id, category: category },
        {
          headers: {
            token,
          },
        }
      );
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [`admincontents-${data}`],
          });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });
  return { mutate };
};
export default useAdminContentsDelete;
