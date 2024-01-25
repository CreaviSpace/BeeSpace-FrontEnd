import { useState } from 'react';

import OnoffButton from '@/components/button/OnOffButton';

export default function OnOffLine() {
  const [onoffLine, setOnoffLine] = useState('on');

  const onoffList = [
    { key: 'on', name: '온라인' },
    { key: 'off', name: '오프라인' },
    { key: 'on/off', name: '온라인/오프라인' },
  ];
  return (
    <>
      <h2 className="text-bs_20 my-5">진행 방식</h2>
      <OnoffButton value={onoffLine} setValue={setOnoffLine} list={onoffList} />
    </>
  );
}
