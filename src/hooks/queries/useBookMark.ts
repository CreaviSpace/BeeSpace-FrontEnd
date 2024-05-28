import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import useLoginModal from '@/store/modal/useLoginModal';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

const useBookMark = (id?: number, postType?: string) => {
  const { onOpen } = useLoginModal();
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token && !!id,
    queryKey: [queryKeys.BOOKMARK, id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/bookmark?postId=${id}&postType=${postType}`
      );

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
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
        `/bookmark?postId=${id}&postType=${postType}`
      );
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.setQueryData([queryKeys.BOOKMARK, id], data.data.data);

          queryClient.invalidateQueries({
            queryKey: [queryKeys.PROFILE_CONTENT, postType?.toLowerCase()],
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
      toast.error('에러 발생');
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useBookMark;
