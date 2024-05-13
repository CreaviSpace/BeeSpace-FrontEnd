import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getLogin } from '@/api/auth';
import { queryKeys } from '@/constants/keys';

const useLogin = () => {
  const router = useRouter();
  const { token } = router.query;

  return useQuery({
    queryFn: () => getLogin(String(token)),
    queryKey: [queryKeys.AUTH],
    enabled: Boolean(token),
  });
};

function useAuth() {
  const getLogin = useLogin();
  const isLogin = getLogin.isSuccess;

  return { getLogin, isLogin };
}

export default useAuth;
