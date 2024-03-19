import axios from 'axios';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = new URL(window.location.href).searchParams.get('code');
      const state = new URL(window.location.href).searchParams.get('state');
      const LoginFetch = async () => {
        const response = await axios.post(
          `${process.env.BASE_URL}/login/naver?code=${code}&state=${state}`
        );

        if (response.data.success) {
          document.cookie = `jwt=${response.data.data.token}; max-age=${response.data.data.expires};`;
        }
      };

      LoginFetch();
    }
  }, []);

  return <></>;
}
