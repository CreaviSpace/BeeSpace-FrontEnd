import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

interface IMyProfileeditorProps {
  nickName: string;
  introduce: string;
  position: string;
  career: number;
  interestedStack: { techStack: string }[];
  profileUrl: string;
}

const useMyProfileEditor = (content: IMyProfileeditorProps) => {
  const router = useRouter();
  const tokent = getCookies('jwt');
  const MID = getCookies('MID', true);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!tokent) {
        return;
      }

      return await axios.post(
        `${process.env.BASE_URL}/member/mypage/edit`,
        content,
        { headers: { Authorization: tokent } }
      );
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200) {
          queryClient.invalidateQueries({ queryKey: [`MemberProfile-${MID}`] });
          toast.success('프로필 수정 성공');
          router.replace(`/profile/${MID}`);
        } else if (data.status === 202 && !data.data.success) {
          postCookies({
            jwt: data.data.data.jwt,
            MID: data.data.data.memberId,
          });
        }
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error('프로필 수정 실패');
    },
  });

  return { mutate };
};

export default useMyProfileEditor;
