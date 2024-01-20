import { IoBookmark } from '@react-icons/all-files/io5/IoBookmark';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';
import { useState } from 'react';

interface IBookmarkProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function Bookmark({
  color = '#0099DB',
  size = 25,
  className,
}: IBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className={className}>
      {isBookmarked ? (
        <button
          type="button"
          aria-label="북마크 비활성화"
          onClick={handleToggleBookmark}>
          <IoBookmarkOutline color={color} size={size} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="북마크 활성화"
          onClick={handleToggleBookmark}>
          <IoBookmark color={color} size={size} />
        </button>
      )}
    </div>
  );
}
