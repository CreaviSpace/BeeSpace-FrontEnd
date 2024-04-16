import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
            document.cookie = `jwt=${response.data.jwt}; max-age=3600;`;
            document.cookie = `MID=${btoa(response.data.memberId)}; max-age=3600;`;

            if (response.data.oldUser) {
              router.back();
            } else {
              router.replace('/signup');
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
