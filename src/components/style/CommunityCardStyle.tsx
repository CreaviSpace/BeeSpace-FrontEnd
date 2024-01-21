import CommunityCard from '@/components/card/CommunityCard';
import { card } from '@/utils/data';

interface CommunityCardStyleProps {
  gridStyle?: 'main' | 'default';
  borderStyle?: 'main' | 'default';
  className?: string;
}

const gridColumns = {
  main: 'grid-cols-2',
  default: 'grid-cols-1',
};

const borderStyle = {
  main: 'border border-gray10 w-[500px]',
  default: 'border-b border-gray10  w-[500px]',
};

export default function CommunityCardStyle({
  gridStyle,
  className,

  ...restProps
}: CommunityCardStyleProps) {
  const grid = gridColumns[gridStyle || 'default'];
  const border = borderStyle[gridStyle || 'default'];

  return (
    <>
      <h1 className="text-bs_24 font-bold mb-7">커뮤니티</h1>
      <div className={`${grid} ${className} grid gap-3`} {...restProps}>
        <CommunityCard
          // key={`community-card-${index}`}
          className={border}
          contents={card.content}
          userName={card.name}
          date={card.date}
          views={card.views}
          comments={card.comment}
        />
        {/* {card?.map((item, index) => {})} */}
      </div>
    </>
  );
}
