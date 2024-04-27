import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import useLoginModal from '@/store/modal/useLoginModal';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useLike = (id?: number, postType?: string) => {
  const { onOpen } = useLoginModal();
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token,
    queryKey: [`like-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/like?postId=${id}&postType=${postType}`,
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );

      if (response.status === 200 && response.data.success) {
        return response.data.data;
      } else if (response.status === 202 && !response.data.success) {
        postCookies({
          jwt: response.data.jwt,
          memberId: response.data.memberId,
        });
      }
    },
    gcTime: 30000 * 12,
    staleTime: 30000 * 12,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!token) {
        return onOpen();
      } else if (!id) {
        return;
      }

      return await axios.post(
        `${process.env.BASE_URL}/like?postId=${id}&postType=${postType}`,
        {},
        {
          headers: { Authorization: getCookies('jwt') },
        }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`like-${id}`] });
          queryClient.invalidateQueries({ queryKey: [`like-view-${id}`] });
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
      toast.error('에러 발생');
    },
  });

  return { isLoading, isError, data, isFetching, mutate };
};

export default useLike;
