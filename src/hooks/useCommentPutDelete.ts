import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

const useCommentPutDelete = (
  id: number,
  type: string,
  postid: number,
  content?: string
) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        `${process.env.BASE_URL}/comment/${id}?postType=${type}`,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comment-${postid}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  const { mutate: mutatePut, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!content) return null;

      return await axios.put(
        `${process.env.BASE_URL}/comment/${id}?postType=${type}`,
        { content: content },
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comment-${postid}`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  return { mutateDelete, mutatePut, isSuccess };
};

export default useCommentPutDelete;
