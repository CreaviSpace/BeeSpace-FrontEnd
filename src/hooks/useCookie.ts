import { useCookies } from 'react-cookie';

import queryClient from '@/utils/queryClien';

const useCookie = (values?: string[]) => {
  const [cookies, setCookie, removeCookie] = useCookies(values);

  const getCookies = (value: string) => cookies[value];

  const setCookies = ({ ...cookies }) => {
    Object.entries(cookies).forEach(([key, value]) => {
      setCookie(key, value);
    });
    queryClient.invalidateQueries({});
  };

  const removeCookies = (cookie: string[]) => {
    cookie.forEach((name) => {
      removeCookie(name);
    });
  };

  return { getCookies, setCookies, removeCookies };
};

export default useCookie;
