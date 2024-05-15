import { useCallback, useRef } from 'react';

import RecruitmentCard from '@/components/card/RecruitmentCard';
import SkeletonRecruitmentCard from '@/components/skeleton/SkeletonRecruitmentCard';
import useRecruit from '@/hooks/queries/recruit/useRecruit';
import { IRecruitType } from '@/types/global';

interface IRecruitmentCardContainerProps {
  category?: string;
  size?: number;
  main?: boolean;
}

export default function RecruitmentCardContainer({
  category = 'all',
  size = 6,
  main,
}: IRecruitmentCardContainerProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRecruit(category, size);

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
        {isLoading || isError
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <SkeletonRecruitmentCard key={`${item}-${index}`} />
            ))
          : data?.pages.map((pages: IRecruitType[]) => {
              return pages?.map((item, index) => (
                <div key={`${item}-${index}`}>
                  <RecruitmentCard item={item} type="recruitment" />
                </div>
              ));
            })}

        {!hasNextPage || main ? null : isFetchingNextPage ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <SkeletonRecruitmentCard key={`${item}-${index}`} />
          ))
        ) : (
          <div ref={lastElementRef} />
        )}
      </div>
    </div>
  );
}
