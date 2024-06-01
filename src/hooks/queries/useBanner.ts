import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';

import useAxiosInstance from '../useAxiosInstance';

const useBanner = (postType: string) => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryFn: async () => {
      let url = '';

      if (postType === 'project') {
        url = `project/popular`;
      } else if (postType === 'recruitment') {
        url = `recruit/deadline`;
      }

      const { data } = await axiosInstance.get(`/${url}`);

      return data;
    },
    queryKey: [queryKeys.BANNER, postType],
    select: (response) => {
      if (!response) return;

      return response.data;
    },
  });
};

export default useBanner;
