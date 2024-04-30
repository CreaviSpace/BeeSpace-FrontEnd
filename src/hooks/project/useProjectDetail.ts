import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useProjectDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`project-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/project/${id}`,
        { headers: { Authorization: getCookies('jwt') } }
      );

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      }

      if (response.status === 202 && !response.data.success) {
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

export default useProjectDetail;
