import dynamic from 'next/dynamic';
import { useState } from 'react';

import OnoffButton from '@/components/button/OnOffButton';

import CustomButton from '../button/CustomButton';
import InputTag from './communtiy/InputTag';
import TitleEditor from './TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function CommunityWrite() {
  const [community, setCommunity] = useState('qna');

  const commnuityList = [
    { key: 'qna', name: 'QnA' },
    { key: 'chat', name: '수다' },
    { key: 'worry', name: '고민' },
  ];

  return (
    <main className="max-w-max_w m-auto p-20">
      <section>
        <h1 className="text-center text-[2rem] font-bold">
          프로젝트를 소개해주세요
        </h1>
        <ul className="my-20">
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">프로젝트 분류</h2>
            <OnoffButton
              value={community}
              setValue={setCommunity}
              list={commnuityList}
            />
          </li>
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">태그</h2>
            <InputTag />
          </li>
          <li className="mt-14">
            <TitleEditor />
            <TextEditor />
          </li>
          <li className="text-right mt-10">
            <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
            <CustomButton color="secondary" className="py-3 px-10">
              작성
            </CustomButton>
          </li>
        </ul>
      </section>
    </main>
  );
}
