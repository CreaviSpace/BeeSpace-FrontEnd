import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const useGetAlarmCount = () => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(`/alarm/count`);

      return { data, status };
    },
    queryKey: [queryKeys.ALARM_COUNT],
    enabled: Boolean(getCookies('jwt')),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        // toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
        //   onClose: () =>
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
        // });
      }

      return response.data.data;
    },
  });
};

export default useGetAlarmCount;
