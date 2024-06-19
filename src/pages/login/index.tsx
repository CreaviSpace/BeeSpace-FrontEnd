import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '@/hooks/queries/useAuth';

export default function Login() {
  const router = useRouter();
  const { getLogin } = useAuth();
  const { data: olduser, isLoading, isSuccess } = getLogin;

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
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
