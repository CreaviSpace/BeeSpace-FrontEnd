import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

import useLogin from '@/store/useLogin';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useLoginCheck = () => {
  const { setLogin, setLogout } = useLogin();
  const MID = getCookies('MID', true);
  const token = getCookies('jwt');

  const { isLoading, data, isError, isFetching, refetch } = useQuery({
    enabled: !!MID && !!token,
    queryKey: [`MemberProfile`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/profile?member-id=${MID}`,
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        setLogin();
        return response.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      } else {
        setLogout();
      }
    },

    staleTime: 30000 * 10,
    gcTime: 30000 * 10,
  });

  useEffect(() => {
    const timer = setInterval(
      () => {
        refetch();
      },
      1000 * 60 * 55
    );

    return () => clearInterval(timer);
  }, []);

  return { isLoading, data, isError, isFetching };
};

export default useLoginCheck;
