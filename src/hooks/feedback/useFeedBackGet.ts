import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFeedBackGet = (id: number | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`feedback-${id}`],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/feedback/question?projectId=${id}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
  });
  return { isLoading, isError, data, isFetching };
};
export default useFeedBackGet;
