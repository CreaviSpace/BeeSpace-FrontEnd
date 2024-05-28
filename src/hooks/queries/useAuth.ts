import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getLogin, getMyProfile } from '@/api/auth';
import { queryKeys } from '@/constants/keys';
import { getCookies } from '@/utils/cookie/getCookies';

const useLogin = () => {
  const router = useRouter();
  const { token } = router.query;

  return useQuery({
    queryFn: () => getLogin(String(token)),
    queryKey: [queryKeys.AUTH],
    enabled: Boolean(token),
  });
};

const useGetMyProfile = () => {
  const MID = getCookies('MID');

  return useQuery({
    queryFn: () => getMyProfile(MID),
    queryKey: [queryKeys.PROFILE_MY],
    enabled: Boolean(MID),
  });
};

function useAuth() {
  const getLogin = useLogin();
  const isLogin = getLogin.isSuccess;
  const getMyProfile = useGetMyProfile();

  return { getLogin, isLogin, getMyProfile };
}

export default useAuth;
