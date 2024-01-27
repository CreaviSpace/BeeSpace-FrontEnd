import { useState } from 'react';

import OnoffButton from '@/components/button/OnOffButton';

export default function Classification() {
  const [recruitment, setRecruitment] = useState('project');

  const recruitmentList = [
    { key: 'project', name: '프로젝트' },
    { key: 'study', name: '스터디' },
  ];

  return (
    <>
      <h2 className="text-bs_20 my-5">모집 분류</h2>
      <OnoffButton
        value={recruitment}
        setValue={setRecruitment}
        list={recruitmentList}
      />
    </>
  );
}
