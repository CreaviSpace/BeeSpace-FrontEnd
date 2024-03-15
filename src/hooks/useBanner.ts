import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBanner = (postType: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`banner-${postType}`],
    queryFn: async () => {
      let url;

      if (postType === 'project') {
        url = `project/popular`;
      } else if (postType === 'recruitment') {
        url = `recruit/deadline`;
      }

      const response = await axios.get(`
      ${process.env.BASE_URL}/${url}
        `);

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000 * 6, // 30분
    staleTime: 30000 * 6, // 30분
  });

  return { isLoading, isError, data, isFetching };
};

export default useBanner;
