import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

const useCommunityDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.COMMUNITY_DETAIL, String(id)],
    queryFn: async () => {
      const response = await axiosInstance.get(`/community/${id}`);

      if (response.data.success) {
        return response.data.data;
      }
    },
  });
  return { isLoading, isError, data, isFetching };
};

export default useCommunityDetail;
