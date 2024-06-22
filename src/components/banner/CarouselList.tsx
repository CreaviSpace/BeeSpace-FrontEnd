import { MdKeyboardArrowLeft } from '@react-icons/all-files/md/MdKeyboardArrowLeft';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import { RefObject, useEffect, useState } from 'react';

import { BtnNext, BtnPrev, Clicklist } from '@/utils/carousel';

interface IBannerListProps {
  length: number;
  bannerAllRef: RefObject<HTMLDivElement>;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
}

export default function CarouselList({
  length,
  bannerAllRef,
  currentIndex,
  setCurrentIndex,
}: IBannerListProps) {
  const [isPaused, setIsPaused] = useState(false);
  const ElementsLength = Array.from(
    { length: length },
    (_, index) => index + 1
  );

  const handleBtnPrev = () => {
    if (bannerAllRef.current) {
      BtnPrev(bannerAllRef.current, currentIndex, setCurrentIndex);
    }
  };

  const handleBtnNext = () => {
    if (bannerAllRef.current) {
      BtnNext(bannerAllRef.current, currentIndex, setCurrentIndex, length);
    }
  };
  const handleClickList = (index: number) => {
    if (bannerAllRef.current) {
      Clicklist(bannerAllRef.current, index, setCurrentIndex);
    }
  };

  const handlePauseOver = () => setIsPaused(true);

  const handlePauseLeave = () => setIsPaused(false);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      handleBtnNext();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, isPaused]);

  return (
    <div className="relative flex justify-center items-center gap-2">
      <span className="cursor-pointer" onClick={handleBtnPrev}>
        <MdKeyboardArrowLeft size={30} color={'FFC700'} />
      </span>
      {ElementsLength.map((_, index) => (
        <span
          key={index}
          className={`${index + 1 === currentIndex ? 'px-3 bg-yellow20' : 'border-[3px] border-primary'} w-[0.65rem] h-[0.65rem] rounded-full cursor-pointer transition-all`}
          onClick={() => {
            handleClickList(index + 1);
          }}
          onMouseOver={handlePauseOver}
          onMouseLeave={handlePauseLeave}
        />
      ))}
      <span className="cursor-pointer" onClick={handleBtnNext}>
        <MdKeyboardArrowRight size={30} color={'FFC700'} />
      </span>
    </div>
  );
}
