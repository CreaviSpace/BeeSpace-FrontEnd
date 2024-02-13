import { card } from '@/utils/data';

import UniversalCard from '../card/UniversalCard';

export default function ContentManagement() {
  const trashData = [1, 2, 3];

  return (
    <section className="w-full p-3">
      <div className="p-3 bg-blue10">
        {trashData.map((item, index) => (
          <UniversalCard
            key={`${item}-${index}`}
            id={card.id}
            title={card.title}
            content={card.content}
            date={card.date}
            size="large"
            className="border-2 border-gray20 mb-2 tablet:w-full"
          />
        ))}
      </div>
    </section>
  );
}
