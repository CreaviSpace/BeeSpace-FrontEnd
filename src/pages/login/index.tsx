import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '@/hooks/queries/useAuth';
import useLoginModal from '@/store/modal/useLoginModal';

export default function Login() {
  const router = useRouter();
  const { getLogin } = useAuth();
  const { data: olduser, isLoading, isSuccess } = getLogin;
  const { onClose } = useLoginModal();

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
    onClose();
  }, [isSuccess, isLoading]);
  return <></>;
}
