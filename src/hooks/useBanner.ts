import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBanner = (kind: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`banner-${kind}`],
    queryFn: async () => {
      const response = await axios.get(`
      ${process.env.BASE_URL}/project/popular
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
