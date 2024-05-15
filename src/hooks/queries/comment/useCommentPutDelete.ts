import { useMutation } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useCommentPutDelete = (
  id: number,
  type: string,
  postid: number,
  content?: string
) => {
  const token = getCookies('jwt');

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () => {
      if (!id && !token) {
        return;
      }

      return await axiosInstance.delete(`/comment/${id}?postType=${type}`);
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.COMMENT, postid],
          });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.jwt,
            MID: data.data.memberId,
          });
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: mutatePut, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!content && !id && !token) return;

      return await axiosInstance.put(`/comment/${id}?postType=${type}`, {
        content: content,
      });
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.COMMENT, postid],
          });
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.jwt,
            MID: data.data.memberId,
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
