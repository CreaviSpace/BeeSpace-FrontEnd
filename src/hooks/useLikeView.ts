import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useLikeView = (id?: number, postType?: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`like-view-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/like/count?postId=${id}&postType=${postType}`
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000,
    staleTime: 30000,
  });

  return { isLoading, isError, data, isFetching };
};

export default useLikeView;
