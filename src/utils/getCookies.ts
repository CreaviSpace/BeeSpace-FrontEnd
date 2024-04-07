import { Cookies } from 'react-cookie';

export const getCookies = (cookieValue: string, decoding?: boolean) => {
  const cookies = new Cookies();

  const cookie = cookies.get(cookieValue);

  if (decoding && cookie) {
    return atob(cookie);
  }

  return cookie;
};
