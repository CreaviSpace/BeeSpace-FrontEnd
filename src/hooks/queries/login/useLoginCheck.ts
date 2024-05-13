import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useLogin from '@/store/useLogin';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';

const useLoginCheck = () => {
  const { setLogin, setLogout } = useLogin();
  const MID = getCookies('MID', true);
  const token = getCookies('jwt');

  const { isLoading, data, isError, isFetching, isSuccess, refetch } = useQuery(
    {
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

      staleTime: 30000 * 7,
      gcTime: 30000 * 7,
    }
  );

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  return { isLoading, data, isError, isFetching };
};

export default useLoginCheck;
