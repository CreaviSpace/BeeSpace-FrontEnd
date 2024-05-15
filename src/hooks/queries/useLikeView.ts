import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

const useLikeView = (id?: number, postType?: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.LIKE_VIEW, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/like/count?postId=${id}&postType=${postType}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  return { isLoading, isError, data, isFetching };
};

export default useLikeView;
