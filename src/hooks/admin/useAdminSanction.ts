import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { getCookies } from '@/utils/cookie/getCookies';

const useAdminSanction = (date: { memberId: string; reason: string }) => {
  const token = getCookies('jwt');

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.BASE_URL}/admin/sanction`, date, {
        headers: { Authorization: token },
      });
    },
  });

  return { mutate };
};

export default useAdminSanction;
