import { useCallback, useRef } from 'react';

import ProjectCard from '@/components/card/ProjectCard';
import useProject from '@/hooks/useProject';

import { IProjectType } from '../../types/global';
import SkeletonProjectCard from '../skeleton/SkeletonProjectCard';

interface IProjectCardContainerProps {
  category?: string;
}

export default function ProjectCardContainer({
  category = 'all',
}: IProjectCardContainerProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProject(category);

  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isError) {
            fetchNextPage();
          }
        },
        { threshold: 0.7 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage]
  );

  return (
    <div className="max-w-max_w w-full">
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <SkeletonProjectCard key={`${item}-${index}`} />
            ))
          : data?.pages.map((pages: IProjectType[]) => {
              return pages.map((item, index) => {
                if (pages.length === index + 1) {
                  return (
                    <div
                      ref={lastElementRef}
                      key={`projectCard-${index}`}
                      className="border-blue-500 border">
                      <ProjectCard
                        item={item}
                        tagName="팀 프로젝트"
                        tagCategory="team"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={`projectCard-${index}`}>
                      <ProjectCard
                        item={item}
                        tagName="팀 프로젝트"
                        tagCategory="team"
                      />
                    </div>
                  );
                }
              });
            })}
      </div>
    </div>
  );
}
