import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/utils/api/axiosInstance';

const useAdminSanction = (date: { memberId: string; reason: string }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`/admin/sanction`, date);
    },
  });

  return { mutate };
};

export default useAdminSanction;
