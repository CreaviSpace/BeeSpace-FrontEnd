import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';

const useMemberSearch = (value: string) => {
  const token = getCookies('jwt');
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: value.trim() !== '' && !!token,
    queryKey: [queryKeys.MEMBER_SEARCH, value],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/member/search?search=${value}`
      );

      if (response.status === 200 && response.data) {
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

export default useMemberSearch;
