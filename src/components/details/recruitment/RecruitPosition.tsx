import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';

interface Position {
  name: string;
  total: number;
  recruited: number;
}

interface Positions {
  frontend: Position;
  backend: Position;
  planning: Position;
  design: Position;
}

export default function RecruitPosition() {
  const MAX_TOTAL_FRONTEND = 2;
  const MAX_TOTAL_BACKEND = 2;
  const MAX_TOTAL_PLANNING = 1;
  const MAX_TOTAL_DESIGN = 1;

  const [positions, setPositions] = useState<Positions>({
    frontend: { name: '프론트엔드', total: MAX_TOTAL_FRONTEND, recruited: 0 },
    backend: { name: '백엔드', total: MAX_TOTAL_BACKEND, recruited: 0 },
    planning: { name: '기획', total: MAX_TOTAL_PLANNING, recruited: 0 },
    design: { name: '디자이너', total: MAX_TOTAL_DESIGN, recruited: 0 },
  });

  const handleApply = (position: keyof Positions) => {
    const { recruited, total } = positions[position];
    if (recruited < total) {
      setPositions((prevPositions) => ({
        ...prevPositions,
        [position]: { ...prevPositions[position], recruited: recruited + 1 },
      }));
    }
  };

  return (
    <div className="w-1/2 mr-8">
      <h2 className="font-bold text-bs_18 mb-4">모집 포지션</h2>
      <ul className="flex justify-between">
        <li className="w-full">
          {Object.entries(positions).map(
            ([position, { name, recruited, total }], index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">{name}</div>
                <div className="flex-1">{`${recruited}/${total}`}</div>
                <CustomButton
                  onClick={() => handleApply(position as keyof Positions)}
                  className={`mt-1 w-24 h-8 ${recruited === total ? 'bg-yellow-400 border-transparent' : ''}`}>
                  {recruited === total ? '완료' : '지원하기'}
                </CustomButton>
              </div>
            )
          )}
        </li>
      </ul>
    </div>
  );
}
