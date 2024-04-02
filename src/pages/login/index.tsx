import axios from 'axios';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = new URL(window.location.href).searchParams.get('token');

      const LoginFetch = async () => {
        const response = await axios.get(
          `${process.env.BASE_URL}/login?token=${token}`
        );

        if (response.data) {
          document.cookie = `jwt=${response.data.jwt};`;
        }
      };

      LoginFetch();
    }
  }, []);

  return <></>;
}
