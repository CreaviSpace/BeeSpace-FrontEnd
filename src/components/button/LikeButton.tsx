import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { UseMutateFunction } from '@tanstack/react-query';

import { useGetLikePost, useMutateLikePost } from '@/hooks/queries/useLike';
import useButtonDebounce from '@/hooks/useButtonDebounce';

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
  const { data, isLoading } = useGetLikePost(id, postType);
  const { mutate } = useMutateLikePost(id, postType);

  const handleToggleLike = useButtonDebounce<UseMutateFunction>(100);

  return (
    <button
      type="button"
      onClick={() => handleToggleLike(mutate)}
      className={className}>
      {!isLoading && data?.likeStatus ? (
        <FaHeart
          color={data?.likeStatus ? '#FF0000' : color}
          size={size}
          aria-label="북마크 활성화"
        />
      ) : (
        <FaRegHeart size={size} aria-label="북마크 비활성화" />
      )}
    </button>
  );
}
