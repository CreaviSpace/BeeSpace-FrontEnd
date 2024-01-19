import { IoBookmark } from '@react-icons/all-files/io5/IoBookmark';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';
import { useState } from 'react';

interface BookmarkProps {
  color?: string;
  size?: number;
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
          <IoBookmark size={size} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="북마크 활성화"
          onClick={handleToggleBookmark}>
          <IoBookmarkOutline color={color} size={size} />
        </button>
      )}
    </>
  );
}
