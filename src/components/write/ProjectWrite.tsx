import dynamic from 'next/dynamic';
import React from 'react';
import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import OnoffButton from '@/components/button/OnOffButton';

import InputTag from './communtiy/InputTag';
import DistributionLink from './project/DistributionLink';
import MemberList from './project/MemberList';
import ProjectBanner from './project/ProjectBanner';
import SkillStack from './SkillStack';
import TitleEditor from './TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function ProjectWrite() {
  const [project, setProject] = useState('individual');

  const commnuityList = [
    { key: 'individual', name: '개인 프로젝트' },
    { key: 'team', name: '팀 프로젝트' },
  ];
  const link = [{ title: '네이버', link: 'www.naver.com' }];

  return (
    <div className="max-w-max_w m-auto p-20">
      <h1 className="text-center text-[2rem] font-bold">
        프로젝트를 소개해주세요
      </h1>
      <ul className="my-20">
        <li className="mt-14">
          <h2 className="text-bs_20 mb-5 font-bold">프로젝트 분류</h2>
          <OnoffButton
            value={project}
            setValue={setProject}
            list={commnuityList}
          />
        </li>
        <li className="mt-14">
          <h2 className="text-bs_20 mb-5 font-bold">멤버</h2>
          <MemberList />
        </li>
        <li className="mt-14">
          <TitleEditor />
          <TextEditor />
        </li>
        <li className="mt-14">
          {/* <h2 className="text-bs_20 mb-5">기술 스택</h2> */}
          <SkillStack />
        </li>
        <li className="mt-14">
          <h2 className="text-bs_20 mb-5 font-bold">
            프로젝트 분야
            <span className="font-normal text-bs_18 ml-1">&#40;선택&#41;</span>
          </h2>
          <InputTag />
        </li>
        <li className="mt-14">
          <DistributionLink />
        </li>
        <li className="flex justify-center p-10 mt-14 border-t border-gray20 mobile:flex-col">
          <div className="w-1/2">
            <h2 className="text-bs_20 my-5 font-bold">프로젝트 배너</h2>
            <ProjectBanner />
          </div>
          <div className="w-1/2">
            <h2 className="text-bs_20 my-5 font-bold">프로젝트 소개</h2>
            <textarea
              name=""
              id="textarea"
              className="border border-gray30 rounded-bs_10 w-full min-w-80 max-h-[420px]"
            />
          </div>
        </li>
        <li className="text-right mt-10">
          <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
          <CustomButton color="secondary" className="py-3 px-10">
            작성
          </CustomButton>
        </li>
      </ul>
    </div>
  );
}
