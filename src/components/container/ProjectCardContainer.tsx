import ProjectCard from '@/components/card/ProjectCard';
import {
  TPostsType,
  useGetInfiniteProjectPosts,
} from '@/hooks/queries/post/useGetInfinitePosts';
import useObserver from '@/hooks/useObserver';

import { IProjectType } from '../../types/global';
import SkeletonProjectCard from '../skeleton/SkeletonProjectCard';

interface IProjectCardContainerProps {
  category?: string;
  size: number;
  main?: boolean;
}

export default function ProjectCardContainer({
  category = 'all',
  size = 6,
  main,
}: IProjectCardContainerProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteProjectPosts(category, size);

  const observerRef = useObserver(isFetchingNextPage, isError, fetchNextPage);

  return (
    <div className="max-w-max_w w-full">
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {isLoading || isError
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <SkeletonProjectCard key={index} />
            ))
          : data?.pages.map((pages: TPostsType) =>
              pages?.map((item, index) => (
                <div key={`projectCard-${index}`}>
                  <ProjectCard item={item as IProjectType} />
                </div>
              ))
            )}

        {!hasNextPage || main ? null : isFetchingNextPage ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <SkeletonProjectCard key={index} />
          ))
        ) : (
          <div ref={observerRef}></div>
        )}
      </div>
    </div>
  );
}
