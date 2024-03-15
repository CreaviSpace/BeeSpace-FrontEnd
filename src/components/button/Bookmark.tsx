import { IoBookmark } from '@react-icons/all-files/io5/IoBookmark';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';

import useBookMark from '@/hooks/useBookMark';

interface IBookmarkProps {
  color?: string;
  size?: number;
  className?: string;
  id: number;
  kind: string;
}

export default function Bookmark({
  color = '#0099DB',
  size = 25,
  className,
  id,
  kind,
}: IBookmarkProps) {
  const { isLoading, isError, data, isFetching, mutate } = useBookMark(
    id,
    kind
  );

  const handleToggleBookmark = () => {
    mutate();
  };

  return (
    <button type="button" onClick={handleToggleBookmark} className={className}>
      {isLoading && data ? (
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
