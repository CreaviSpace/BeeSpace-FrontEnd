import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

const useProjectDetail = (id: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: async () => {
      //   if (!id) {
      //     return;
      //   }

      const respones = await axios.get(
        `${process.env.BASE_URL}/project/${id}`,
        { headers: { Authorization: getCookies('jwt') } }
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
