import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import useLoginModal from '@/store/useLoginModal';
import { getCookies } from '@/utils/getCookies';

const useBookMark = (id?: number, postType?: string) => {
  const { onOpen } = useLoginModal();

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [`bookmark-${id}`],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BASE_URL}/bookmark?postId=${id}&postType=${postType}`,
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
      const token = getCookies('jwt');

      if (!token) {
        return onOpen();
      }

      return await axios.post(
        `${process.env.BASE_URL}/bookmark?postId=${id}&postType=${postType}`,
        {},
        {
          headers: {
            Authorization: token,
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
