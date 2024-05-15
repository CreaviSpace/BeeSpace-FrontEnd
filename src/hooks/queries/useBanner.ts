import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

const useBanner = (postType: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [queryKeys.BANNER, postType],
    queryFn: async () => {
      let url;

      if (postType === 'project') {
        url = `project/popular`;
      } else if (postType === 'recruitment') {
        url = `recruit/deadline`;
      }

      const response = await axiosInstance.get(`/${url}`);

      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  return { isLoading, isError, data, isFetching };
};

export default useBanner;
