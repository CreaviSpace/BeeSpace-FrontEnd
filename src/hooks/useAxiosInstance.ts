import axios from 'axios';

import useCookie from './useCookie';

const useAxiosInstance = () => {
  const { getCookies } = useCookie(['jwt']);

  return axios.create({
    baseURL: process.env.BASE_URL,
    headers: { Authorization: `${getCookies('jwt')}` },
  });
};

export default useAxiosInstance;
