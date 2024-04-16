import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useCommentGetPost = (id: number, type: string, content: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`comment-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/comment?postId=${id}&postType=${type}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    gcTime: 30000,
    staleTime: 30000,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/comment?postId=${id}&postType=${type}`,
        { content: content },
        { headers: { Authorization: getCookies('jwt') } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comment-${id}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useCommentGetPost;
