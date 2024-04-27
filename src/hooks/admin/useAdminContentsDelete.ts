import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useAdminContentsDelete = (id: number, category: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/admin/contents/delete`,
        { id, category },
        {
          headers: {
            Authorization: getCookies('jwt'),
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`admincontents-${id}`],
      });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });
  return { mutate };
};
export default useAdminContentsDelete;
