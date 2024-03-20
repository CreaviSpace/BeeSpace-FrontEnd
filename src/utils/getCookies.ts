import { Cookies } from 'react-cookie';

export const getCookies = (cookie: string) => {
  const cookies = new Cookies();

  return cookies.get(cookie);
};
