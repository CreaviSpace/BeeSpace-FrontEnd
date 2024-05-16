import { axiosInstance } from '@/utils/api/axiosInstance';
import { postCookies } from '@/utils/cookie/postCookies';

const getLogin = async (token: string | null) => {
  const response = await axiosInstance.get(`/login?token=${token}`);

  if (response.data && response.status === 200) {
    postCookies({
      jwt: response.data.jwt,
      MID: response.data.memberId,
      OLD: response.data.oldUser ? 1 : 0,
    });

    return response.data.oldUser;
  } else if (response.status === 202) {
    alert(response.data.message);
    alert(response.data.reason);
    alert(response.data.deadLine.split('T')[0]);
    return true;
  }
};

export { getLogin };
