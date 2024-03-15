import { useCallback, useRef } from 'react';

import RecruitmentCard from '@/components/card/RecruitmentCard';
import SkeletonRecruitmentCard from '@/components/skeleton/SkeletonRecruitmentCard';
import useRecruit from '@/hooks/useRecruit';
import { IRecruitType } from '@/types/global';

interface IRecruitmentCardContainerProps {
  postType?: string;
}

export default function RecruitmentCardContainer({
  postType = 'all',
}: IRecruitmentCardContainerProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecruit(postType);

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
    <div className="max-w-max_w w-full my-10">
      <div className="grid grid-cols-3 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <SkeletonRecruitmentCard key={`${item}-${index}`} />
            ))
          : data?.pages.map((pages: IRecruitType[]) => {
              return pages.map((item, index) => {
                if (pages.length === index + 1) {
                  return (
                    <div ref={lastElementRef} key={`${item}-${index}`}>
                      <RecruitmentCard item={item} />
                    </div>
                  );
                } else {
                  return (
                    <div key={`${item}-${index}`}>
                      <RecruitmentCard item={item} />
                    </div>
                  );
                }
              });
            })}
      </div>
    </div>
  );
}
