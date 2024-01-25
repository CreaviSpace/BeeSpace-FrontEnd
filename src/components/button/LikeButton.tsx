import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { useState } from 'react';

interface ILikeButtonProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function LikeButton({
  color = '#FF0000',
  size = 20,
  className,
}: ILikeButtonProps) {
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
          <FaRegHeart size={size} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="북마크 활성화"
          onClick={handleToggleBookmark}>
          <FaHeart color={color} size={size} />
        </button>
      )}
    </div>
  );
}
