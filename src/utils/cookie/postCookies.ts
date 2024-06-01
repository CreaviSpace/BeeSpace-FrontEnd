import { Cookies } from 'react-cookie';

export const postCookies = ({ ...cookies }) => {
  const cookie = new Cookies();

  try {
    Object.entries(cookies).forEach(([key, value]) => {
      cookie.set(key, value, { path: '/', maxAge: 7200 });
    });
  } catch (error) {
    console.error(error);
  }
};
