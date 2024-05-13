import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

const useMemberProfileGet = (memberId: string) => {
  const { isLoading, data, isError, isFetching } = useQuery({
    enabled: !!memberId,
    queryKey: [queryKeys.PROFILE_MEMBER, String(memberId)],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/member/read/profile?member-id=${memberId}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
  });

  return { isLoading, data, isError, isFetching };
};

export default useMemberProfileGet;
