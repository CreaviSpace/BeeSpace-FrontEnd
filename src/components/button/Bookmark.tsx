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
    <button type="button" onClick={handleToggleBookmark} className={className}>
      {isBookmarked ? (
        <IoBookmarkOutline
          color={color}
          size={size}
          aria-label="비활성화된 북마크"
        />
      ) : (
        <IoBookmark color={color} size={size} aria-label="활성화된 북마크" />
      )}
    </button>
  );
}
