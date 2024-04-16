import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useWriteDelete = (id: number, postType: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`${process.env.BASE_URL}/${postType}/${id}`, {
        headers: {
          Authorization: getCookies('jwt'),
        },
      });
    },

    onSuccess: () => {
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
