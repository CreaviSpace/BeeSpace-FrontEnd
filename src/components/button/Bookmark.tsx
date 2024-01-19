import { GrBookmark } from '@react-icons/all-files/gr/GrBookmark';
import { IoBookmarkSharp } from '@react-icons/all-files/io5/IoBookmarkSharp';
import { useState } from 'react';

interface BookmarkProps {
  color: string;
  size: number;
}

export default function Bookmark({
  color = '#0099DB',
  size = 25,
}: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      {isBookmarked ? (
        <button
          type="button"
          aria-label="북마크 비활성화"
          onClick={handleToggleBookmark}>
          <GrBookmark size={size} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="북마크 활성화"
          onClick={handleToggleBookmark}>
          <IoBookmarkSharp color={color} size={size} />
        </button>
      )}
    </>
  );
}
