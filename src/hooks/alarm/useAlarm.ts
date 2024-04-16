import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useAlarm = () => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`alarm`],
    queryFn: async () => {
      const response = await axios.get(`${process.env.BASE_URL}/alarm`, {
        headers: { Authorization: getCookies('jwt') },
      });

      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      if (!id) {
        return null;
      }

      return axios.put(`${process.env.BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`alarm`] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useAlarm;
