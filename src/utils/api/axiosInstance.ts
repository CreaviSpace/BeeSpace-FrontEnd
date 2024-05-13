import axios from 'axios';

import { getCookies } from '../getCookies';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { Authorization: `Bearer ${getCookies('jwt')}` },
});
