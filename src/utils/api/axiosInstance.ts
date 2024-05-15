import axios from 'axios';

import { getCookies } from '../cookie/getCookies';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { Authorization: `${getCookies('jwt')}` },
});
