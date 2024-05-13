import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useAlarm = () => {
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token,
    queryKey: [queryKeys.ALARM],
    queryFn: async () => {
      const response = await axiosInstance.get(`/alarm`);

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return;
      }

      return axiosInstance.put(`${process.env.BASE_URL}/alarm`);
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [queryKeys.ALARM] });
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
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useAlarm;
