import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRecruitDetail = (id: string | undefined) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`recruit-${id}`],
    queryFn: async () => {
      const respones = await axios.get(`${process.env.BASE_URL}/recruit/${id}`);

      if (respones.data.success) {
        return respones.data.data;
      }
    },
    staleTime: 30000 * 6,
    gcTime: 30000 * 6,
  });

  return { isLoading, isError, data, isFetching };
};

export default useRecruitDetail;
