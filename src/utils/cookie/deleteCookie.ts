import { Cookies } from 'react-cookie';

export const deleteCookie = (cookie: string[]) => {
  const cookies = new Cookies();

  cookie.map((item) => {
    cookies.remove(item);
  });
};
