import { useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';

export default function Period() {
  const [period, setPeriod] = useState(['default']);
  const [option] = useState([
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월 이상',
  ]);
  return (
    <div>
      <h2 className="text-bs_20 my-5">진행 기간</h2>
      <CustomSelect
        option={option}
        select={period}
        setSelect={setPeriod as (personnel: (string | number)[]) => void}
        index={0}
      />
    </div>
  );
}
