// 프로젝트, 모집, 커뮤니티 리스트, 마감, 인기 게시물
import { QueryKey, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';

const useGetPost = (
  id: string | undefined,
  postType: string,
  queryKey: QueryKey
) => {
  const axiosInstance = useAxiosInstance();
  const { setCookies } = useCookie(['jwt', 'MID']);

  return useQuery({
    queryFn: async () => {
      const { data, status } = await axiosInstance.get(`/${postType}/${id}`);

      return { data, status };
    },
    queryKey,
    enabled: Boolean(id),
    select: (response) => {
      if (!response) return;

      if (response.status === 202 && !response.data.success) {
        // toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED, {
        //   onClose: () =>
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
        // });
      }

      return response.data.data;
    },
  });
};

const useGetProjectPost = (postType: string, id: string | undefined) => {
  const queryKeysList = [queryKeys.PROJECT_DETAIL, String(id)];

  return useGetPost(id, postType, queryKeysList);
};

const useGetRecruitPost = (postType: string, id: string | undefined) => {
  const queryKeysList = [queryKeys.RECRUIT_DETAIL, String(id)];

  return useGetPost(id, postType, queryKeysList);
};

const useGetCommunityPost = (postType: string, id: string | undefined) => {
  const queryKeysList = [queryKeys.COMMUNITY_DETAIL, String(id)];

  return useGetPost(id, postType, queryKeysList);
};

export { useGetCommunityPost, useGetProjectPost, useGetRecruitPost };
