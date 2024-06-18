// 인증 관련, 로그인, 내 프로필 등

import { toast } from 'react-toastify';

import { axiosInstance } from '@/utils/api/axiosInstance';

const getLogin = async (
  token: string | null,
  setCookies: ({ ...cookies }: { [x: string]: string | number }) => void
) => {
  const response = await axiosInstance.get(`/login?token=${token}`);

  if (response.data && response.status === 200) {
    setCookies({
      jwt: response.data.jwt,
      MID: response.data.memberId,
      OLD: response.data.oldUser ? 1 : 0,
    });

    return response.data.oldUser;
  } else if (response.status === 202) {
    toast.warning(
      response.data.message +
        '\n' +
        response.data.reason +
        '\n' +
        response.data.deadLine.split('T')[0]
    );

    return true;
  }
};

export { getLogin };
