import { FaShareAlt } from '@react-icons/all-files/fa/FaShareAlt';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { useState } from 'react';

import LikeButton from '@/components/button/LikeButton';

import Bookmark from './Bookmark';

interface ISideButtonProps {
  id: number;
  type: string;
  className?: string;
}

export default function SideButton({ id, type, className }: ISideButtonProps) {
  const [isHidden, setIsHidden] = useState(true);

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const handleButtonOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  return (
    <aside className={`${className} absolute right-10`}>
      <div
        className="fixed w-fit h-fit p-2 py-3 rounded-md bg-secondary z-10 tablet:p-[0.375rem] mobile:p-[0.375rem] tablet:bottom-2 tablet:right-2 mobile:bottom-2 mobile:right-2"
        onClick={(e) => {
          handleButtonOnClick(e);
        }}>
        <div className="flex flex-col items-center gap-2 relative">
          <button
            className={`bordere rounded-md bg-white p-3 font-black hidden z-10 bottom-0 tablet:block mobile:block tablet:p-2 mobile:p-2 ${isHidden ? 'tablet:relative mobile:relative' : 'tablet:absolute mobile:absolute'}`}
            onClick={(e) => {
              handleButtonMove(e);
            }}>
            <IoIosArrowDown
              size={25}
              className={`${isHidden ? 'rotate-0' : 'rotate-180'} transition-all`}
            />
          </button>

          <LikeButton
            color="black"
            size={25}
            id={id}
            postType={type}
            className={`border rounded-md bg-white p-3 relative bottom-0 tablet:p-2 mobile:p-2 ${isHidden ? 'tablet:relative mobile:relative' : 'tablet:absolute mobile:absolute'}`}
          />
          <Bookmark
            color="black"
            size={25}
            id={id}
            postType={type}
            className={`border rounded-md bg-white p-3 relative bottom-0 tablet:p-2 mobile:p-2 ${isHidden ? 'tablet:relative mobile:relative' : 'tablet:absolute mobile:absolute'}`}
          />

          <button
            type="button"
            aria-label="공유 버튼"
            className={`border rounded-md bg-white p-3 tablet:p-2 mobile:p-2`}>
            <FaShareAlt size={25} className="m-auto" />
          </button>
        </div>
      </div>
    </aside>
  );
}
