import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';

interface IMyProfileProps {
  nickName: string;
  introduce: string;
  position: string;
  career: number;
  interestedStack: string[];
  profileUrl: string;
}

const useMyProfilePost = (content: IMyProfileProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(
        `${process.env.BASE_URL}/member/mypage/edit`,
        { content: content },
        { headers: { Authorization: getCookies('jwt') } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`myProfile`] });
    },
    onError: () => {
      toast.error('에러 발생');
    },
  });

  return { mutate };
};

export default useMyProfilePost;
