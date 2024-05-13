import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCommunityDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`community-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/community/${id}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000 * 12,
    staleTime: 30000 * 12,
  });
  return { isLoading, isError, data, isFetching };
};

export default useCommunityDetail;
