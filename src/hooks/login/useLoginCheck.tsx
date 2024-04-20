import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import useLogin from '@/store/useLogin';
import { getCookies } from '@/utils/getCookies';

const useLoginCheck = () => {
  const { setLogin, setLogout } = useLogin();
  const MID = getCookies('MID', true);
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: [`MemberProfile`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/member/read/profile?member-id=${MID}`,
        { headers: { Authorization: getCookies('jwt') } }
      );

      if (response.status === 200) {
        setLogin();
        return response.data;
      } else {
        setLogout();
        throw new Error(response.data.error);
      }
    },

    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
  });

  return { isLoading, data, isError, isFetching };
};

export default useLoginCheck;
