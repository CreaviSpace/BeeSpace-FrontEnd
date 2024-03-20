import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const useBookMark = (id?: number, postType?: string) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [`bookmark-${id}`],
    queryFn: async () => {
      // const response = await axios.get(
      //   `${process.env.BASE_URL}/bookmark/${kind}/${id}`
      // );
      // if (response.data.success) {
      //   return response.data.data;
      // }
    },
    gcTime: 30000, // 5분
    staleTime: 30000, // 5분
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/bookmark/${postType}/${id}`
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
