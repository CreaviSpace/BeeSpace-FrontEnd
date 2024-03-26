import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ICommunityBody, IProjectBody, IRecruitBody } from '@/types/global';
import { getCookies } from '@/utils/getCookies';

const useWriteUpdate = (
  id: number,
  postType: string,
  data: IProjectBody | IRecruitBody | ICommunityBody
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.put(
        `${process.env.BASE_URL}/${postType}/${id}`,
        data,
        {
          headers: {
            Authorization: getCookies('jwt'),
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${postType}-${id}`] });
      toast.success('글쓰기 성공');
    },
    onError: () => {
      toast.error('글쓰기 실패');
    },
  });

  return { mutate };
};

export default useWriteUpdate;
