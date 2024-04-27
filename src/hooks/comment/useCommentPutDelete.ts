import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useCommentPutDelete = (
  id: number,
  type: string,
  postid: number,
  content?: string
) => {
  const token = getCookies('jwt');
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () => {
      if (!id && !token) {
        return;
      }

      return await axios.delete(
        `${process.env.BASE_URL}/comment/${id}?postType=${type}`,
        {
          headers: { Authorization: token },
        }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            memberId: data.data.data.memberId,
          });
        }
      }

      queryClient.invalidateQueries({ queryKey: [`comment-${postid}`] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: mutatePut, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!content && !id && !token) return;

      return await axios.put(
        `${process.env.BASE_URL}/comment/${id}?postType=${type}`,
        { content: content },
        {
          headers: { Authorization: token },
        }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`comment-${postid}`] });
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

  return { mutateDelete, mutatePut, isSuccess };
};

export default useCommentPutDelete;
