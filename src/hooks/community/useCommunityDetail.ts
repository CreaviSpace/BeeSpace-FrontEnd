import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCommunityDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`community-${id}`],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/community/${id}`,
        { params: { withCredentials: true } }
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000 * 6,
    staleTime: 30000 * 6,
  });
  return { isLoading, isError, data, isFetching };
};

export default useCommunityDetail;
