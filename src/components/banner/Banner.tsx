import { useRef, useState } from 'react';

import useBanner from '@/hooks/useBanner';
import { TransitionEnd } from '@/utils/carousel';

import CarouselList from '../CarouselList';
import SkeletonBanner from '../skeleton/SkeletonBanner';
import BannerItem from './BannerItem';

interface IBannerProps {
  postType: string;
}

interface IBannerItem {
  id: number;
  postType: string;
  title: string;
  thumbnail?: string;
  category: string;
  bannerContent: string;
  // techStacks: {
  //   techStackId: 0;
  //   techStack: 'string';
  //   iconUrl: 'string';
  // }[];
  iconUrl: 'string';
}

export default function Banner({ postType }: IBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const bannerAllRef = useRef<HTMLDivElement>(null);

  const { isLoading, isError, data, isFetching } = useBanner(postType);

  const handleTransitionEnd = () => {
    if (bannerAllRef.current) {
      TransitionEnd(
        bannerAllRef.current,
        currentIndex,
        setCurrentIndex,
        data.length
      );
    }
  };

  return (
    <div className="overflow-hidden">
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        data?.length > 0 && (
          <>
            <div
              className="relative right-full flex items-center mt-10 mb-5 m-auto transition-all "
              ref={bannerAllRef}
              onTransitionEnd={handleTransitionEnd}>
              <div
                className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
                <BannerItem
                  postType={data[data.length - 1].postType}
                  id={data[data.length - 1].id}
                  title={data[data.length - 1].title}
                  content={data[data.length - 1].bannerContent}
                  image={data[data.length - 1].thumbnail}
                  date={data[data.length - 1].end}
                  // iconUrl={data[data.length - 1].techStacks[0].iconUrl}
                />
              </div>
              {data.map((item: IBannerItem, index: number) => (
                <div
                  key={`banner-${index}`}
                  className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
                  <BannerItem
                    postType={item.postType}
                    id={item.id}
                    title={item.title}
                    content={item.bannerContent}
                    image={item.thumbnail}
                    date={data[data.length - 1].end}
                    // iconUrl={data[data.length - 1].techStacks[0].iconUrl}
                  />
                </div>
              ))}
              <div
                className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
                <BannerItem
                  postType={data[0].postType}
                  id={data[0].id}
                  title={data[0].title}
                  content={data[0].content}
                  image={data[0].thumbnail}
                  date={data[data.length - 1].end}
                  // iconUrl={data[data.length - 1].techStacks[0].iconUrl}
                />
              </div>
            </div>
            {bannerAllRef && (
              <CarouselList
                length={data.length}
                bannerAllRef={bannerAllRef}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
          </>
        )
      )}
    </div>
  );
}
