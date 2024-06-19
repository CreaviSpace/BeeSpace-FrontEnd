import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '@/hooks/queries/useAuth';
import useLoginStore from '@/store/useLoginStore';

export default function Login() {
  const router = useRouter();
  const { getLogin } = useAuth();
  const { data: olduser, isLoading, isSuccess } = getLogin;
  const { setLogin } = useLoginStore();

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setLogin();
        if (olduser) {
          router.back();
        } else {
          router.replace('/profile/editer');
        }
      }
    }
  }, [isSuccess, isLoading]);
  return <></>;
}
