import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { queryKeys } from '@/constants/keys';
import { errorMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const useGetFeedBackAnalysis = (id: number) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const router = useRouter();

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(
        `/feedback/analysis?projectId=${id}`
      );

      return { data, status };
    },
    queryKey: [queryKeys.FEEDBACK_ANALYSIS, id],
    enabled: Boolean(id) && Boolean(getCookies('jwt')),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED);
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
        router.back();
      }

      return response.data.data;
    },
  });
};

export default useGetFeedBackAnalysis;
