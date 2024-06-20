import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages, successMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';
import useLoginModal from '@/store/modal/useLoginModal';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

interface IMyProfileeditorProps {
  nickName: string;
  introduce: string;
  position: string;
  career: number;
  interestedStack: { techStack: string }[];
  profileUrl: string;
}

const useMutateUpdateProfile = (content: IMyProfileeditorProps) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`/member/mypage/edit`, content);
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200) {
        queryClient.setQueryData(
          [queryKeys.AUTH, queryKeys.PROFILE_MY],
          response.data
        );

        queryClient.invalidateQueries({
          queryKey: [queryKeys.PROFILE_MEMBER, getCookies('MID')],
        });

        toast.success(successMessages.PROFILE_UPDATE);
        router.replace(`/profile/${getCookies('MID')}`);
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED);
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
    onError: (error) => {
      queryOnError(getCookies('jwt'), error);
    },
    onSettled: () => {
      if (!getCookies('jwt')) return onOpen();
    },
  });
};

export default useMutateUpdateProfile;
