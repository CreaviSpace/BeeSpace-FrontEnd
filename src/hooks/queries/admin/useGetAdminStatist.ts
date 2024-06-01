import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const useGetAdminStatist = (date: string, category: string) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(
        `/admin/statistics/${date}?category=${category}`
      );

      return { data, status };
    },
    queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_STATISTICS, date, category],
    enabled: Boolean(getCookies('jwt')),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: () =>
            setCookies({
              jwt: response.data.jwt,
              MID: response.data.memberId,
            }),
        });
      }

      return response.data.data;
    },
  });
};
export default useGetAdminStatist;
