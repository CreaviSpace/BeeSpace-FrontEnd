import { useRef, useState } from 'react';

import { TransitionEnd } from '@/utils/carousel';
import { images } from '@/utils/data';

import CarouselList from './CarouselList';
import PopularImage from './PopularImage';

export default function PopularProject() {
  // 데이터 넣어줘야함

  const [currentIndex, setCurrentIndex] = useState(1);

  const listRef = useRef<HTMLDivElement>(null);

  const handleTransitionEnd = () => {
    if (listRef.current) {
      TransitionEnd(
        listRef.current,
        currentIndex,
        setCurrentIndex,
        Math.ceil(images.length / 2)
      );
    }
  };

  return (
    <div className="max-w-[550px] p-[0.1px] overflow-x-hidden">
      <div className="text-bs_24 flex justify-between items-end">
        <span>인기 프로젝트</span>
        <span className="text-gray20 text-bs_16">더 보기</span>
      </div>

      <div
        className="relative right-full flex transition-all "
        ref={listRef}
        onTransitionEnd={handleTransitionEnd}>
        <PopularImage
          img1={images[images.length - 2]}
          img2={images[images.length - 1]}
        />
        {images.map((item, index) => {
          if (index % 2 == 0) {
            return (
              <PopularImage
                key={`pop-${index}`}
                img1={images[index]}
                img2={images[index + 1]}
              />
            );
          }
        })}
        <PopularImage img1={images[0]} img2={images[1]} />
      </div>

      {listRef && (
        <CarouselList
          length={Math.ceil(images.length / 2)}
          bannerAllRef={listRef}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
