import { useRef, useState } from 'react';

import { TransitionEnd } from '@/utils/carousel';
import { card, images } from '@/utils/data';

import CarouselList from '../CarouselList';
import BannerItem from './BannerItem';

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const bannerAllRef = useRef<HTMLDivElement>(null);

  const handleTransitionEnd = () => {
    if (bannerAllRef.current) {
      TransitionEnd(
        bannerAllRef.current,
        currentIndex,
        setCurrentIndex,
        images.length
      );
    }
  };

  return (
    <div className="overflow-hidden">
      <div
        className="relative right-full flex items-center mt-10 mb-5 m-auto transition-all "
        ref={bannerAllRef}
        onTransitionEnd={handleTransitionEnd}>
        <div className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
          <BannerItem
            type={false}
            id={card.id}
            title={card.title}
            content={card.content}
            image={images[images.length - 1]}
          />
        </div>
        {images.map((item, index) => (
          <div
            key={`banner-${index}`}
            className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
            <BannerItem
              type={false}
              id={card.id}
              title={card.title}
              content={card.content}
              image={item}
            />
          </div>
        ))}
        <div className={`w-full flex-grow-0 flex-shrink-0 flex-basis-auto`}>
          <BannerItem
            type={false}
            id={card.id}
            title={card.title}
            content={card.content}
            image={images[0]}
          />
        </div>
      </div>
      {bannerAllRef && (
        <CarouselList
          length={images.length}
          bannerAllRef={bannerAllRef}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
