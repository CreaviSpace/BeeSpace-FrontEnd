import Link from 'next/link';
import { useRef, useState } from 'react';

import useBanner from '@/hooks/useBanner';
import { IBannerItem } from '@/types/global';
import { TransitionEnd } from '@/utils/carousel';

import PopularImageCard from '../card/PopularImageCard';
import CarouselList from '../CarouselList';
import SkeletonPopularCard from '../skeleton/SkeletonPopularCard';

interface IPopularProjectProps {
  postType: string;
}

export default function PopularProject({ postType }: IPopularProjectProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const { isLoading, data, isError, isFetching } = useBanner('project');

  const handleTransitionEnd = () => {
    if (listRef.current) {
      TransitionEnd(
        listRef.current,
        currentIndex,
        setCurrentIndex,
        Math.ceil(data.length / 2)
      );
    }
  };

  return (
    <div className="w-[550px] p-[0.1px] mx-auto mb-auto overflow-x-hidden tablet:w-[767px] min_mobile:w-[330px]">
      <div className="text-bs_24 flex justify-between items-start w-full">
        <h2 className="text-bs_24 font-bold">인기 프로젝트</h2>
        <Link href={`/project?type=all`} className="text-gray20 text-bs_16">
          더 보기
        </Link>
      </div>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : data?.length === 0 ? null : (
        <>
          <div
            className="relative right-full flex transition-all"
            ref={listRef}
            onTransitionEnd={handleTransitionEnd}>
            <PopularImageCard
              img1={data[data?.length - 2].thumbnail}
              img2={data[data?.length - 1].thumbnail}
            />
            {data.map((item: IBannerItem, index: number) => {
              if (index % 2 == 0) {
                return (
                  <PopularImageCard
                    key={`pop-${index}`}
                    img1={data[index]?.thumbnail}
                    img2={data[index + 1]?.thumbnail}
                    link1={`/project/${data[index]?.id}`}
                    link2={`/project/${data[index + 1]?.id}`}
                  />
                );
              }
            })}
            <PopularImageCard
              img1={data[0]?.thumbnail}
              img2={data[1]?.thumbnail}
            />
          </div>
          {listRef && (
            <CarouselList
              length={Math.ceil(data.length / 2)}
              bannerAllRef={listRef}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['/'],
    fallback: false,
  };
}
