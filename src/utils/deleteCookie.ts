import { Cookies } from 'react-cookie';

export const DeleteCookie = (cookie: string[]) => {
  const cookies = new Cookies();

  cookie.map((item) => {
    cookies.remove(item);
  });
};
