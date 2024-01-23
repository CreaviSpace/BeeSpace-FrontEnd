import { card } from '@/utils/data';

import RecruitmentCard from '../card/RecruitmentCard';

export default function RecruitmentCardContainer() {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className="max-w-max_w my-10">
      <div className="grid grid-cols-3 gap-y-6 gap-x-3 bg-white tablet:grid-cols-2 mobile:grid-cols-1">
        {data.map((item) => (
          <RecruitmentCard
            key={item}
            title={card.title}
            content={card.content}
            skill={['react', 'java']}
            people={{ position: 'back', people: 1 }}
          />
        ))}
      </div>
    </div>
  );
}
