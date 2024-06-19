// 프로젝트, 모집, 커뮤니티 상세

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import { ICommunityType, IProjectType, IRecruitType } from '@/types/global';

type TPostsType = IProjectType[] | ICommunityType[] | IRecruitType[];

const useGetInfinitePosts = (
  size: number,
  postsAPI: (pageParam: number) => Promise<TPostsType>,
  queryKey: QueryKey
) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => postsAPI(pageParam),
    queryKey,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      if (!lastPage) {
        return null;
      }

      return lastPage?.length === 0 || lastPage?.length < size
        ? undefined
        : nextPage;
    },
  });
};

const useGetInfiniteProjectPosts = (category: string, size: number) => {
  const axiosInstance = useAxiosInstance();

  const postsAPI = async (pageParam: number): Promise<IProjectType[]> => {
    const { data } = await axiosInstance.get(
      `/project?size=${size}&page=${pageParam}${category !== 'all' ? `&category=${category}` : ''}`
    );

    return data.data;
  };
  const queryKey = [queryKeys.PROJECT, category, size];

  return useGetInfinitePosts(size, postsAPI, queryKey);
};

const useGetInfiniteRecruitPosts = (category: string, size: number) => {
  const axiosInstance = useAxiosInstance();

  const postsAPI = async (pageParam: number): Promise<IRecruitType[]> => {
    const { data } = await axiosInstance.get(
      `/recruit?size=${size}&page=${pageParam}${category === 'all' ? '' : `&category=${category}`}`
    );

    return data.data;
  };
  const queryKey = [queryKeys.RECRUIT, category, size];

  return useGetInfinitePosts(size, postsAPI, queryKey);
};

const useGetInfiniteCommunityPosts = (
  category: string,
  size: number,
  hashTag?: string | undefined,
  orderby?: string | undefined
) => {
  const axiosInstance = useAxiosInstance();

  const postsAPI = async (pageParam: number): Promise<ICommunityType[]> => {
    const { data } = await axiosInstance.get(
      `/community?size=${size}&page=${pageParam}${category !== 'all' ? `&category=${category}` : ''}${hashTag ? `&hashTag=${hashTag} ` : ''}${orderby ? `&sort=${orderby}` : ''}`
    );

    return data.data;
  };
  const queryKey = [queryKeys.PROJECT, category, size, orderby];

  return useGetInfinitePosts(size, postsAPI, queryKey);
};

export {
  useGetInfiniteCommunityPosts,
  useGetInfinitePosts,
  useGetInfiniteProjectPosts,
  useGetInfiniteRecruitPosts,
};

export type { TPostsType };
