import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import OnoffButton from '@/components/button/OnOffButton';
import useCommunityData from '@/store/useCommunityData';

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
  const commnuityList = [
    { key: 'qna', name: 'QnA' },
    { key: 'chat', name: '수다' },
    { key: 'worry', name: '고민' },
  ];

  const { category, title, content, hashTags, setter } = useCommunityData();

  useEffect(() => {
    if (!category) {
      setter.setCategory('qna');
    }
  }, []);

  return (
    <main>
      <section className="max-w-max_w m-auto p-20">
        <h1 className="text-center text-[2rem] font-bold">
          프로젝트를 소개해주세요
        </h1>
        <ul className="my-20">
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">프로젝트 분류</h2>
            <OnoffButton
              value={category}
              setValue={setter.setCategory}
              list={commnuityList}
            />
          </li>
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">태그</h2>
            <InputTag
              value={hashTags}
              setValue={
                setter.setHashTags as (value: string | string[]) => void
              }
            />
          </li>
          <li className="mt-14">
            <TitleEditor title={title} setTitle={setter.setTitle} />
            <TextEditor values={content} setValues={setter.setContent} />
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
