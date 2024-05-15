import { Cookies } from 'react-cookie';

export const getCookies = (cookieValue: string, decoding?: boolean) => {
  try {
    const cookies = new Cookies();

    const cookie = cookies.get(cookieValue);

    return cookie;
  } catch (error) {
    console.error(error);
  }
};
