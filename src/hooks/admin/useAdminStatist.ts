import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useAdminStatist = (date: string, category: string) => {
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`statistics-${category}-${date}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/admin/statistics/${date}?category=${category}`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.data.success && response.status === 200) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
    gcTime: 30000 * 12,
    staleTime: 30000 * 12,
  });

  return { isLoading, isError, data, isFetching };
};

export default useAdminStatist;
