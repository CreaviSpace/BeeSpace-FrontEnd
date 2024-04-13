import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useMemberSearch = (value: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: value.trim() !== '',
    queryKey: [`member-${value}`],
    queryFn: async () => {
      if (value.trim() === '') {
        return;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/member/search?search=${value}`,
        { headers: { Authorization: getCookies('jwt') } }
      );

      if (response.data) {
        return response.data.data;
      }
    },
    gcTime: 30000,
    staleTime: 30000,
  });

  return { isLoading, isError, data, isFetching };
};

export default useMemberSearch;
