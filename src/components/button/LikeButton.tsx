import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';

import useLike from '@/hooks/useLike';

interface ILikeButtonProps {
  color?: string;
  size?: number;
  className?: string;
  id: number;
  kind: string;
}

export default function LikeButton({
  color = '#FF0000',
  size = 20,
  className,
  id,
  kind,
}: ILikeButtonProps) {
  const { isLoading, isError, data, isFetching, mutate } = useLike(id, kind);

  const handleToggleBookmark = () => {
    mutate();
  };

  return (
    <button type="button" onClick={handleToggleBookmark} className={className}>
      {isLoading && data ? (
        <FaRegHeart size={size} aria-label="북마크 비활성화" />
      ) : (
        <FaHeart color={color} size={size} aria-label="북마크 활성화" />
      )}
    </button>
  );
}
