import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { postCookies } from '@/utils/cookie/postCookies';

const useAdminStatist = (date: string, category: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [queryKeys.ADMIN, queryKeys.ADMIN_STATISTICS, date, category],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/statistics/${date}?category=${category}`
      );

      if (response.data.success && response.status === 200) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
  });

  return { isLoading, isError, data, isFetching };
};

export default useAdminStatist;
