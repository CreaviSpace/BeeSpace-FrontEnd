import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';
import { getCookies } from '@/utils/cookie/getCookies';
import { postCookies } from '@/utils/cookie/postCookies';
import queryClient from '@/utils/queryClien';

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
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!tokent) {
        return;
      }

      return await axiosInstance.post(`/member/mypage/edit`, content);
    },
    onSuccess: (data) => {
      if (data) {
        if (data.status === 200) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.PROFILE_MY],
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.PROFILE_MEMBER, MID],
          });
          toast.success('프로필 수정 성공');
          router.replace(`/profile/${MID}`);
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
      toast.error('프로필 수정 실패');
    },
  });

  return { mutate };
};

export default useMyProfileEditor;
