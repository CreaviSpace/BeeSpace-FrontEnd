import { parseValue } from '@/utils/parseValue';

interface RecruitPosition {
  positions: [
    {
      id: 0;
      position: 'string';
      amount: 0;
      now: 0;
    },
  ];
}

export default function RecruitPosition({ positions }: RecruitPosition) {
  return (
    <div className="w-1/2 mr-8">
      <h2 className="font-bold text-bs_18 mb-4">모집 포지션</h2>
      <ul className="flex justify-between">
        <li className="w-full">
          {positions?.map((item, index: number) => (
            <div key={`${index}`} className="flex justify-between items-center">
              <div className="flex-1">{parseValue(item.position)}</div>
              <div className="flex-1">{item.amount}명</div>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
}
