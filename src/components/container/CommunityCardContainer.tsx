import { useCallback, useRef } from 'react';

import CommunityCard from '@/components/card/CommunityCard';
import SkeletonCommunityCard from '@/components/skeleton/SkeletonCommunityCard';
import useCommunity from '@/hooks/useCommunity';
import { ICommunityType } from '@/types/global';

interface ICommunityCardStyleProps {
  category?: string;
  size: number;
  hashTag?: string;
  className?: string;
  isActive?: 'main' | 'default';
}

export default function CommunityCardContainer({
  category = 'all',
  size,
  hashTag,
  isActive,
  ...restProps
}: ICommunityCardStyleProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunity(category, size, hashTag);

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

  const gridColumns = {
    main: 'grid-cols-2 gap-3',
    default: 'grid-cols-1 max-w-[43.75rem]',
  };

  const borderStyle = {
    main: 'border',
    default: 'border-b',
  };

  return (
    <div
      className={`grid ${isActive === 'main' ? gridColumns.main : gridColumns.default} w-full mobile:grid-cols-1`}
      {...restProps}>
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((item, index) => (
            <SkeletonCommunityCard key={`${item}-${index}`} />
          ))
        : data?.pages.map((pages: ICommunityType[]) => {
            return pages?.map((item, index) => {
              if (pages.length === index + 1) {
                return (
                  <div ref={lastElementRef} key={`${item}-${index}`}>
                    <CommunityCard
                      className={`mt-2 ${isActive === 'main' ? borderStyle.main : borderStyle.default}`}
                      id={item.id}
                      type="community"
                      contents={item.content}
                      userName={`임시 유저 이름`}
                      date={item.modifiedDate}
                      views={item.viewCount}
                      comments={0}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={`${item}-${index}`}>
                    <CommunityCard
                      className={`mt-2 ${isActive === 'main' ? borderStyle.main : borderStyle.default}`}
                      id={item.id}
                      type="community"
                      contents={item.content}
                      userName={`임시 유저 이름`}
                      date={item.modifiedDate}
                      views={item.viewCount}
                      comments={0}
                    />
                  </div>
                );
              }
            });
          })}
    </div>
  );
}
