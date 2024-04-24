import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import useLoginModal from '@/store/modal/useLoginModal';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useBookMark = (id?: number, postType?: string) => {
  const { onOpen } = useLoginModal();
  const token = getCookies('jwt');

  const { isLoading, isError, data, isFetching } = useQuery({
    enabled: !!token && !!id,
    queryKey: [`bookmark-${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/bookmark?postId=${id}&postType=${postType}`,
        {
          headers: {
            Authorization: token,
          },
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
    gcTime: 30000 * 6,
    staleTime: 30000 * 6,
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
        `${process.env.BASE_URL}/bookmark?postId=${id}&postType=${postType}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    },

    onSuccess: (data) => {
      if (data) {
        if (data.status === 200 && data.data.success) {
          queryClient.invalidateQueries({ queryKey: [`bookmark-${id}`] });
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

export default useBookMark;
