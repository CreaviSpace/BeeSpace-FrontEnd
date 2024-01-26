import { useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';

export default function Communication() {
  const [communication, setCommunication] = useState(['default']);
  const [option] = useState(['오픈톡', '이메일', '채팅', '구글폼']);

  return (
    <div>
      <h2 className="text-bs_20 my-5">연락 방법</h2>
      <CustomSelect
        option={option}
        select={communication}
        setSelect={setCommunication as (personnel: (string | number)[]) => void}
        index={0}
      />
      {communication[0] !== 'default' && (
        <input
          type="text"
          placeholder={`${communication[0]} 링크`}
          className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
        />
      )}
    </div>
  );
}
