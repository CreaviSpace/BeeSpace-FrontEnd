import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';

import useLike from '@/hooks/queries/useLike';

interface ILikeButtonProps {
  color?: string;
  size?: number;
  className?: string;
  id: number;
  postType: string;
}

export default function LikeButton({
  color = '#FF0000',
  size = 20,
  className,
  id,
  postType,
}: ILikeButtonProps) {
  const { isLoading, isError, data, isFetching, mutate } = useLike(
    id,
    postType
  );

  const handleToggleLike = () => {
    mutate();
  };

  return (
    <button type="button" onClick={handleToggleLike} className={className}>
      {!isLoading && data?.likeStatus ? (
        <FaHeart color={color} size={size} aria-label="북마크 활성화" />
      ) : (
        <FaRegHeart size={size} aria-label="북마크 비활성화" />
      )}
    </button>
  );
}
