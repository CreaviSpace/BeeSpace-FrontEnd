import { MdKeyboardArrowLeft } from '@react-icons/all-files/md/MdKeyboardArrowLeft';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';
import { RefObject } from 'react';

import { BtnNext, BtnPrev, Clicklist } from '@/utils/carousel';
import { images } from '@/utils/data';

interface IBannerListProps {
  length: string[];
  bannerAllRef: RefObject<HTMLDivElement>;
  bannerOneRef: RefObject<HTMLDivElement>;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
}

export default function BannerList({
  length,
  bannerAllRef,
  bannerOneRef,
  currentIndex,
  setCurrentIndex,
}: IBannerListProps) {
  const handleBtnPrev = () => {
    if (bannerAllRef.current && bannerOneRef.current) {
      BtnPrev(
        bannerAllRef.current,
        bannerOneRef.current,
        currentIndex,
        setCurrentIndex
      );
    }
  };

  const handleBtnNext = () => {
    if (bannerAllRef.current && bannerOneRef.current) {
      BtnNext(
        bannerAllRef.current,
        bannerOneRef.current,
        currentIndex,
        setCurrentIndex,
        images.length
      );
    }
  };
  const handleClickList = (index: number) => {
    if (bannerAllRef.current && bannerOneRef.current) {
      Clicklist(
        bannerAllRef.current,
        bannerOneRef.current,
        index,
        setCurrentIndex
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center gap-2">
      <span className="cursor-pointer" onClick={handleBtnPrev}>
        <MdKeyboardArrowLeft size={20} />
      </span>
      {length.map((item, index) => (
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
