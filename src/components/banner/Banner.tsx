import { useRef, useState } from 'react';

import { TransitionEnd } from '@/utils/carousel';
import { card, images } from '@/utils/data';

import BannerItem from './BannerItem';
import BannerList from './BannerList';

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const bannerAllRef = useRef<HTMLDivElement>(null);
  const bannerOneRef = useRef<HTMLDivElement>(null);

  const handleTransitionEnd = () => {
    if (bannerAllRef.current && bannerOneRef.current) {
      TransitionEnd(
        bannerAllRef.current,
        bannerOneRef.current,
        currentIndex,
        setCurrentIndex,
        images.length
      );
    }
  };

  return (
    <div className="mb-10">
      <div
        className="relative right-full flex mt-10 mb-5 mx-auto transition-all"
        ref={bannerAllRef}
        onTransitionEnd={handleTransitionEnd}>
        <div
          className={`w-screen flex-grow-0 flex-shrink-0 flex-basis-auto`}
          ref={bannerOneRef}>
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
            className={`w-screen flex-grow-0 flex-shrink-0 flex-basis-auto`}
            ref={bannerOneRef}>
            <BannerItem
              type={false}
              id={card.id}
              title={card.title}
              content={card.content}
              image={item}
            />
          </div>
        ))}
        <div
          className={`w-screen flex-grow-0 flex-shrink-0 flex-basis-auto`}
          ref={bannerOneRef}>
          <BannerItem
            type={false}
            id={card.id}
            title={card.title}
            content={card.content}
            image={images[0]}
          />
        </div>
      </div>
      {bannerAllRef && bannerOneRef && (
        <BannerList
          length={images}
          bannerAllRef={bannerAllRef}
          bannerOneRef={bannerOneRef}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}
