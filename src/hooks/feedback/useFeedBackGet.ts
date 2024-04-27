import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useFeedBackGet = (id: number | undefined) => {
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`feedback-${id}`],
    queryFn: async () => {
      if (!token && !id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/feedback/question?projectId=${id}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      }
    },
    gcTime: 30000 * 12,
    staleTime: 30000 * 12,
  });
  return { isLoading, isError, data, isFetching };
};
export default useFeedBackGet;
