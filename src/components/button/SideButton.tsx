import { FaShareAlt } from '@react-icons/all-files/fa/FaShareAlt';

import LikeButton from '@/components/button/LikeButton';

import Bookmark from './Bookmark';

interface ISideButtonProps {
  className?: string;
}

export default function SideButton({ className }: ISideButtonProps) {
  return (
    <aside
      className={`${className} flex flex-col max-w-12 items-center gap-1 py-2 rounded-md bg-secondary`}>
      <LikeButton
        color="black"
        size={30}
        className="border rounded-md bg-white p-1"
      />
      <Bookmark
        color="black"
        size={30}
        className="border rounded-md bg-white p-1"
      />
      <button
        type="button"
        aria-label="공유 버튼"
        className="border rounded-md bg-white p-1">
        <FaShareAlt size={30} className="m-auto" />
      </button>
    </aside>
  );
}
