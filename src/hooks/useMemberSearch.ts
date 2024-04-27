import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useMemberSearch = (value: string) => {
  const token = getCookies('jwt');
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: value.trim() !== '' && !!token,
    queryKey: [`member-${value}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/search?search=${value}`,
        { headers: { Authorization: token } }
      );

      if (response.status === 200 && response.data) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      }
    },
    gcTime: 30000 * 6,
    staleTime: 30000 * 6,
  });

  return { isLoading, isError, data, isFetching };
};

export default useMemberSearch;
