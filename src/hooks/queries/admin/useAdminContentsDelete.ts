import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useAdminContentsDelete = (id: number, category: string) => {
  const token = getCookies('jwt');

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }
      return await axiosInstance.post(`/admin/contents/delete`, {
        id,
        category,
      });
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_CONTENT, id],
          });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.jwt,
            MID: data.data.memberId,
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
