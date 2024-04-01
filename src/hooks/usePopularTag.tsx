import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePopularTag = () => {
  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: [`hashtag-list`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/hashtag/popular`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
  });

  return { isLoading, data, isError, isFetching };
};
