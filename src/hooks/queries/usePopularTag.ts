import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';

import useAxiosInstance from '../useAxiosInstance';

const useGetPopularTag = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/hashtag/popular`);

      return data;
    },
    queryKey: [queryKeys.HASH_TAG],
    select: (response) => {
      if (!response) return;

      return response.data;
    },
  });
};

export default useGetPopularTag;
