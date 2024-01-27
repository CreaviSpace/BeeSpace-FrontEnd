import { FaShareAlt } from '@react-icons/all-files/fa/FaShareAlt';

import LikeButton from '@/components/button/LikeButton';

import Bookmark from './Bookmark';

interface ISideButtonProps {
  className?: string;
}

export default function SideButton({ className }: ISideButtonProps) {
  return (
    <aside className="absolute -right-2 top-1/3">
      <div
        className={`${className} fixed mobile:hidden w-fit h-fit flex flex-col items-center gap-2 p-2 py-3 rounded-md bg-secondary`}>
        <LikeButton
          color="black"
          size={25}
          className="border rounded-md bg-white p-3"
        />
        <Bookmark
          color="black"
          size={25}
          className="border rounded-md bg-white p-3"
        />
        <button
          type="button"
          aria-label="공유 버튼"
          className="border rounded-md bg-white p-3">
          <FaShareAlt size={25} className="m-auto" />
        </button>
      </div>
    </aside>
  );
}
