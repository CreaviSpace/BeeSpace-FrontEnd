import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useMemberProfileGet = (memberId: string) => {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: [`MemberProfile-${memberId}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/profile?member-id=${memberId}`,
        { headers: { Authorization: getCookies('jwt') } }
      );

      if (response.data) {
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    },

    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
  });

  return { isLoading, data, isError, isFetching };
};

export default useMemberProfileGet;
