import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAlarmCount = () => {
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token,
    queryKey: [`alarm-counts`],
    queryFn: async () => {
      const response = await axios.get(`${process.env.BASE_URL}/alarm/count`, {
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

  return { isLoading, isError, data, isFetching };
};

export default useAlarmCount;
