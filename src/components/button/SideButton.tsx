import { FaLongArrowAltRight } from '@react-icons/all-files/fa/FaLongArrowAltRight';
import { FaShareAlt } from '@react-icons/all-files/fa/FaShareAlt';
import { useRef } from 'react';

import LikeButton from '@/components/button/LikeButton';

import Bookmark from './Bookmark';

interface ISideButtonProps {
  className?: string;
}

export default function SideButton({ className }: ISideButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (divRef.current) {
      divRef.current.style.marginRight = '-50px';
    }
  };

  const handleButtonOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (divRef.current && divRef.current.style.marginRight === '-50px') {
      divRef.current.style.marginRight = '0px';
    }
  };

  return (
    <aside className={`${className} absolute right-10`}>
      <div
        className="fixed w-fit h-fit flex flex-col items-center gap-2 p-2 py-3 rounded-md bg-secondary z-10 tablet:bottom-3 tablet:right-3 mobile:bottom-3 mobile:right-3"
        ref={divRef}
        onClick={(e) => {
          handleButtonOnClick(e);
        }}>
        <button
          className="bordere rounded-md bg-white p-3 font-black hidden tablet:block mobile:block mobile:p-2"
          onClick={(e) => {
            handleButtonMove(e);
          }}>
          <FaLongArrowAltRight size={25} />
        </button>

        <LikeButton
          color="black"
          size={25}
          className="border rounded-md bg-white p-3 mobile:p-2"
        />
        <Bookmark
          color="black"
          size={25}
          className="border rounded-md bg-white p-3 mobile:p-2"
        />
        <button
          type="button"
          aria-label="공유 버튼"
          className="border rounded-md bg-white p-3 mobile:p-2">
          <FaShareAlt size={25} className="m-auto" />
        </button>
      </div>
    </aside>
  );
}
