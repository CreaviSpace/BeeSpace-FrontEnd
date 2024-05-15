import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useLoginModal from '@/store/modal/useLoginModal';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useCommentGetPost = (id: number, type: string, content: string) => {
  const token = getCookies('jwt');
  const { onOpen } = useLoginModal();

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: [queryKeys.COMMENT, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/comment?postId=${id}&postType=${type}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return onOpen();
      } else if (!id) {
        return;
      }

      return await axiosInstance.post(
        `/comment?postId=${id}&postType=${type}`,
        { content: content }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENT, id] });
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

  return { isLoading, isError, data, isFetching, mutate };
};

export default useCommentGetPost;
