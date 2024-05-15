import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

export const usePopularTag = () => {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: [queryKeys.HASH_TAG],
    queryFn: async () => {
      const response = await axiosInstance.get(`/hashtag/popular`);
      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  return { isLoading, data, isError, isFetching };
};
