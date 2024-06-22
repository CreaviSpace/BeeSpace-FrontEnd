import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { IBannerItem } from '@/types/global';

import useAxiosInstance from '../useAxiosInstance';

const useBanner = (postType: string, banner: boolean = true) => {
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

      if (postType === 'project') {
        if (banner) {
          return response.data;
        } else {
          return response.data.filter((f: IBannerItem) => f.thumbnail !== '');
        }
      } else if (postType === 'recruitment') {
        return response.data;
      }
    },
  });
};

export default useBanner;
