import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { getLogin } from '@/api/auth';
import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useLoginModal from '@/store/modal/useLoginModal';
import { getCookies } from '@/utils/cookie/getCookies';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

import useAxiosInstance from '../useAxiosInstance';
import useCookie from '../useCookie';

const useLogin = () => {
  const router = useRouter();
  const { token } = router.query;

  return useQuery({
    queryFn: () => getLogin(String(token)),
    queryKey: [queryKeys.AUTH],
    enabled: Boolean(token),
  });
};

const useLogOut = () => {
  const axiosInstance = useAxiosInstance();
  const { removeCookies } = useCookie(['jwt', 'MID', 'OLD']);

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`/logout`);
    },
    onSuccess: () => {
      removeCookies(['jwt', 'MID', 'OLD']);
      // queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
      queryClient.clear();
    },
    onError: (error) => {
      queryOnError(getCookies('jwt'), error);
    },
  });
};

const useGetMyProfile = () => {
  const axiosInstance = useAxiosInstance();
  const { getCookies } = useCookie(['MID']);

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/member/read/profile?member-id=${getCookies('MID')}`
      );

      return data;
    },
    queryKey: [queryKeys.AUTH, queryKeys.PROFILE_MY],
    enabled: Boolean(getCookies('MID')),
  });
};

const useMutateExpire = () => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`/member/expire`);
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200) {
        queryClient.invalidateQueries({});
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
          onClose: () =>
            setCookies({
              jwt: response.data.jwt,
              MID: response.data.memberId,
            }),
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

function useAuth() {
  const getLogin = useLogin();
  const logout = useLogOut();
  const isLogin = getLogin.isSuccess;
  const getMyProfile = useGetMyProfile();
  const expire = useMutateExpire();

  return { getLogin, isLogin, getMyProfile, logout, expire };
}

export default useAuth;
