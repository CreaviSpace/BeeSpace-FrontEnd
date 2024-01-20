import CommunityItem from '@/components/card/CommunityCard';
import { card } from '@/utils/data';

interface CommunityCardStyleProps {
  className?: string;
}
export default function CommunityCardStyle({
  className,
}: CommunityCardStyleProps) {
  // const arrangeStyle = {
  //   main: ' grid-cols-2',
  //   community: 'grid-cols-1',
  // };

  return (
    <div className={`${className} grid`}>
      <CommunityItem
        className="border border-gray10 w-[500px]"
        contents={card.content}
        userName={card.name}
        date={card.date}
      />
    </div>
  );
}
