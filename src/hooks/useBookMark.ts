import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useBookMark = (id?: number, type?: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`bookmark-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/bookmark?postId=${id}&type=${type}`,
        {
          headers: {
            Authorization: getCookies('jwt'),
          },
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
        `${process.env.BASE_URL}/bookmark?postId=${id}&type=${type}`,
        {},
        {
          headers: {
            Authorization: getCookies('jwt'),
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`bookmark-${id}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useBookMark;
