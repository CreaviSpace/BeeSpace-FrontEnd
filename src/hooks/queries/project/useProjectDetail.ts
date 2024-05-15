import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { postCookies } from '@/utils/cookie/postCookies';

const useProjectDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.PROJECT_DETAIL, String(id)],
    queryFn: async () => {
      const response = await axiosInstance.get(`/project/${id}`);

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      }

      if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
  });

  return { isLoading, isError, data, isFetching };
};

export default useProjectDetail;
