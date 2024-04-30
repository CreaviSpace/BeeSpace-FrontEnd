import { useCallback, useRef, useState } from 'react';

import CommunityCard from '@/components/card/CommunityCard';
import SkeletonCommunityCard from '@/components/skeleton/SkeletonCommunityCard';
import useCommunity from '@/hooks/community/useCommunity';
import { ICommunityType } from '@/types/global';

const GRIDCOLUMNS = {
  main: 'grid-cols-2 gap-3',
  default: 'grid-cols-1 max-w-[43.75rem]',
};

const BORDERSTYLE = {
  main: 'border',
  default: 'border-t',
};

const ORDERBY = [
  { name: '최신활동순', link: 'created_date,asc' },
  { name: '추천순', link: 'like_count,desc' },
  { name: '조회수순', link: 'view_count,desc' },
];

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
  const [orderby, setOrderby] = useState('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommunity(category, size, hashTag, orderby);

  const handleOrderButtonClike = (link: string, index: number) => {
    setOrderby(link);
    setActiveIndex(index);
  };

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
    <div
      className={`grid ${isActive === 'main' ? GRIDCOLUMNS.main : GRIDCOLUMNS.default} w-full mobile:grid-cols-1`}
      {...restProps}>
      <ul
        className={`${isActive === 'main' ? 'hidden' : 'flex gap-3 mt-5 mb-1'}`}>
        {ORDERBY.map((item, index) => (
          <li key={index} className="flex items-center justify-between ">
            {activeIndex === index ? (
              <span className="mr-1 block w-1 h-1 rounded-md bg-green-400"></span>
            ) : (
              <span className="mr-1 block w-1 h-1"></span>
            )}
            <button
              className="text-bs_14"
              onClick={() => handleOrderButtonClike(item.link, index)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map((item, index) => (
            <SkeletonCommunityCard key={`${item}-${index}`} />
          ))
        : data?.pages.map((pages: ICommunityType[]) => {
            return pages?.map((item, index) => (
              <div key={`${item}-${index}`}>
                <CommunityCard
                  className={`mt-2 ${isActive === 'main' ? BORDERSTYLE.main : BORDERSTYLE.default}`}
                  item={item}
                />
              </div>
            ));
          })}
      {hasNextPage && isActive === 'main' ? null : isFetchingNextPage ? (
        [1, 2, 3, 4].map((item, index) => (
          <SkeletonCommunityCard key={`${item}-${index}`} />
        ))
      ) : (
        <div ref={lastElementRef} />
      )}
    </div>
  );
}
