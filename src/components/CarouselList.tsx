import { MdKeyboardArrowLeft } from '@react-icons/all-files/md/MdKeyboardArrowLeft';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import { RefObject } from 'react';

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

  return (
    <div className="relative flex justify-center items-center gap-2">
      <span className="cursor-pointer" onClick={handleBtnPrev}>
        <MdKeyboardArrowLeft size={20} />
      </span>
      {ElementsLength.map((item, index) => (
        <span
          key={index}
          className={`w-2 h-2 rounded-full ${index + 1 === currentIndex ? 'bg-red-500' : 'bg-black'} cursor-pointer`}
          onClick={() => {
            handleClickList(index + 1);
          }}></span>
      ))}
      <span className="cursor-pointer" onClick={handleBtnNext}>
        <MdKeyboardArrowRight size={20} />
      </span>
    </div>
  );
}
