import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { postCookies } from '@/utils/postCookies';

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = new URL(window.location.href).searchParams.get('token');

      const LoginFetch = async () => {
        try {
          const response = await axios.get(
            `${process.env.BASE_URL}/login?token=${token}`
          );

          if (response.data) {
            postCookies({
              jwt: response.data.jwt,
              memberId: btoa(response.data.memberId),
              old: response.data.oldUser ? 1 : 0,
            });

            if (response.data.oldUser) {
              router.back();
            } else {
              router.replace('/profile/editer');
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      LoginFetch();
    }
  }, []);

  return <></>;
}
