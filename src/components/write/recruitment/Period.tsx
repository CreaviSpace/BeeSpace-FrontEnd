import { useEffect, useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';

interface IPeriodProps {
  workDay: number;
  setWorkDay: (workDay: number) => void;
}

export default function Period({ workDay, setWorkDay }: IPeriodProps) {
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

  useEffect(() => {
    const periodNumber = period[0].split('월')[0];
    setWorkDay(parseInt(periodNumber));
  }, [period]);

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
