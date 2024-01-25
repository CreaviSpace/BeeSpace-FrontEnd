import CommunityCard from '@/components/card/CommunityCard';
import { card } from '@/utils/data';

interface ICommunityCardStyleProps {
  className?: string;
  isActive?: 'main' | 'default';
}

export default function CommunityCardContainer({
  isActive,
  ...restProps
}: ICommunityCardStyleProps) {
  const gridColumns = {
    main: 'grid-cols-2 gap-3',
    default: 'grid-cols-1 max-w-[43.75rem]',
  };

  const borderStyle = {
    main: 'border',
    default: 'border-b',
  };

  return (
    <div
      className={`grid ${isActive === 'main' ? gridColumns.main : gridColumns.default} mobile:grid-cols-1`}
      {...restProps}>
      <CommunityCard
        className={`mt-2 ${isActive === 'main' ? borderStyle.main : borderStyle.default}`}
        contents={card.content}
        userName={card.name}
        date={card.date}
        views={card.views}
        comments={card.comment}
      />
    </div>
  );
}
