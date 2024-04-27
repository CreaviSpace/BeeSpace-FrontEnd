import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAlarmDelete = () => {
  const token = getCookies('jwt');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return await axios.delete(`${process.env.BASE_URL}/alarm`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: ['alarm'] });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate };
};

export default useAlarmDelete;
