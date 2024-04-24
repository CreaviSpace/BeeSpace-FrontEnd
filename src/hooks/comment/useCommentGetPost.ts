import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import useLoginModal from '@/store/modal/useLoginModal';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useCommentGetPost = (id: number, type: string, content: string) => {
  const token = getCookies('jwt');
  const queryClient = useQueryClient();
  const { onOpen } = useLoginModal();

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
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

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return onOpen();
      } else if (!id) {
        return;
      }

      return await axios.post(
        `${process.env.BASE_URL}/comment?postId=${id}&postType=${type}`,
        { content: content },
        { headers: { Authorization: token } }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`comment-${id}`] });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useCommentGetPost;
