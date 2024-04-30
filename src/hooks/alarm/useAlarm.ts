import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAlarm = () => {
  const token = getCookies('jwt');
  const queryClient = useQueryClient();

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token,
    queryKey: [`alarm`],
    queryFn: async () => {
      const response = await axios.get(`${process.env.BASE_URL}/alarm`, {
        headers: { Authorization: token },
      });

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      }
    },
    staleTime: 30000 * 12,
    gcTime: 30000 * 12,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return axios.put(
        `${process.env.BASE_URL}/alarm`,
        {},
        { headers: { Authorization: token } }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`alarm`] });
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

  return { isLoading, isError, data, isFetching, mutate };
};

export default useAlarm;
