import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { queryKeys } from '@/constants/keys';
import { postCookies } from '@/utils/cookie/postCookies';

const useRecruitDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.RECRUIT_DETAIL, String(id)],
    queryFn: async () => {
      const response = await axios.get(`${process.env.BASE_URL}/recruit/${id}`);

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

export default useRecruitDetail;
