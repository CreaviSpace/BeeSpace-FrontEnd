import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useFeedBackAnalysis = (id: number) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`analysis-${id}`],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/feedback/analysis?projectId=${id}`,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  return { isLoading, isError, data, isFetching };
};

export default useFeedBackAnalysis;
