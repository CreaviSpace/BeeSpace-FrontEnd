import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProjectDetail = (id: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: async () => {
      //   if (!id) {
      //     return;
      //   }

      const respones = await axios.get(
        `${process.env.BASE_URL}/project/${id}`,
        { params: { withCredentials: true } }
      );

      if (respones.data.success) {
        return respones.data.data;
      }
    },
    gcTime: 30000 * 5, // 30분
    staleTime: 30000 * 5, // 30분
  });

  return { isLoading, isError, data, isFetching };
};

export default useProjectDetail;
