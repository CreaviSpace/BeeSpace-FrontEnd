import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';

const useLoginCheck = () => {
  const MID = getCookies('MID', true);
  const token = getCookies('jwt');

  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    enabled: !!MID && !!token,
    queryKey: [queryKeys.PROFILE_MY],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/member/read/profile?member-id=${MID}`
      );

      if (response.status === 200) {
        return response.data;
      }
    },
  });

  return { isLoading, data, isError, isFetching };
};

export default useLoginCheck;
