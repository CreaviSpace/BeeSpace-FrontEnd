import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useLike = (id?: number, postType?: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`like-${id}`],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/like?postId=${id}&postType=${postType}`,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000, // 5분
    staleTime: 30000, // 5분
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/like?postId=${id}&postType=${postType}`,
        {},
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`like-${id}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useLike;
