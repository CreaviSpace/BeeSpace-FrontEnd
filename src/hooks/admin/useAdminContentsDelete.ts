import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';
interface IAdminContentsDelete {
  data: { id: number; category: string };
}

const useAdminContentsDelete = (data: IAdminContentsDelete) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.BASE_URL}/member/expire`, data, {
        headers: {
          Authorization: getCookies('jwt'),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admincontents-${data}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });
  return { mutate };
};
export default useAdminContentsDelete;
