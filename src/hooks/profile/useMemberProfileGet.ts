import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMemberProfileGet = (memberId: string) => {
  const { isLoading, data, isError, isFetching } = useQuery({
    enabled: !!memberId,
    queryKey: [`MemberProfile-${memberId}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/profile?member-id=${memberId}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },

    staleTime: 30000 * 12,
    gcTime: 30000 * 12,
  });

  return { isLoading, data, isError, isFetching };
};

export default useMemberProfileGet;
