import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';

const useGetProfileMember = (memberId: string | undefined) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/member/read/profile?member-id=${memberId}`
      );

      return data;
    },
    queryKey: [queryKeys.PROFILE_MEMBER, String(memberId)],
    enabled: Boolean(memberId),
  });
};

export default useGetProfileMember;
