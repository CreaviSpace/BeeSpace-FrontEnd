import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';

const useFeedBackGet = (id: number | undefined, type: string) => {
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token && !!id,
    queryKey: [queryKeys.FEEDBACK, id, type],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/feedback/question?projectId=${id}`
      );

      if (response.status === 200 && response.data.success) {
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
export default useFeedBackGet;