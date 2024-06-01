import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';

const useGetComment = (id: number, type: string) => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/comment?postId=${id}&postType=${type}`
      );

      return data;
    },
    queryKey: [queryKeys.COMMENT, id],
    enabled: Boolean(id),
    select: (response) => {
      if (!response) return;

      return response.data;
    },
  });
};

export default useGetComment;
