import { useQuery } from '@tanstack/react-query';

import useLogin from '@/store/useLogin';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/getCookies';

const useLoginCheck = () => {
  const { setLogin, setLogout } = useLogin();
  const MID = getCookies('MID', true);
  const token = getCookies('jwt');

  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    enabled: !!MID && !!token,
    queryKey: [`MemberProfile`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/member/read/profile?member-id=${MID}`
      );

      if (response.status === 200) {
        setLogin();
        return response.data;
      }
    },

    // staleTime: 30000 * 12,
    // gcTime: 30000 * 12,
    staleTime: 1000 * 55,
    gcTime: 1000 * 55,
  });

  return { isLoading, data, isError, isFetching };
};

export default useLoginCheck;
