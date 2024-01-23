import { card } from '@/utils/data';

import RecruitmentCard from '../card/RecruitmentCard';

export default function RecruitmentCardStyle() {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <div className="max-w-max_w">
      <h1 className="text-bs_24 font-bold mb-7">모집</h1>
      <div className="grid grid-cols-3 gap-y-6 gap-x-3 bg-white tablet:grid-cols-2">
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
