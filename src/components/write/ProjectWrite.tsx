import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import OnoffButton from '@/components/button/OnOffButton';
import useWritePost from '@/hooks/useWritePost';
import useProjectData from '@/store/useProjectData';

import InputTag from './communtiy/InputTag';
import DistributionLink from './project/DistributionLink';
import MemberList from './project/MemberList';
import ProjectBanner from './project/ProjectBanner';
import SkillStackInput from './SkillStackInput';
import TitleEditor from './TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function ProjectWrite() {
  const {
    category,
    title,
    content,
    field,
    memberDtos,
    techStackDtos,
    linkDtos,
    thumbnail,
    bannerContent,
    setter,
  } = useProjectData();

  useEffect(() => {
    if (!category) {
      setter.setCategory('individual');
    }
  }, []);

  // memberId랑 teachStackId는 테스트 용
  const projectData = {
    category,
    memberDtos: [
      {
        memberId: 1,
        position: 'frontend',
      },
    ],
    title,
    content,
    techStackDtos: [
      {
        techStackId: 1,
      },
    ],
    field,
    linkDtos,
    thumbnail,
    bannerContent,
  };

  const { mutate } = useWritePost('project', projectData);

  const commnuityList = [
    { key: 'individual', name: '개인 프로젝트' },
    { key: 'team', name: '팀 프로젝트' },
  ];

  const handleBannerContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setter.setBannerContent(e.target.value);
  };

  return (
    <main className="max-w-max_w min-w-min_w m-auto p-20 mobile:p-3">
      <section className="border-b border-gray20">
        <h1 className="text-center text-[2rem] font-bold">
          프로젝트<span className="mobile:hidden">를 소개해주세요</span>
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
            <h2 className="text-bs_20 mb-5 font-bold">멤버</h2>
            <MemberList setMemberDtos={setter.setMemberDtos} />
          </li>
          <li className="mt-14">
            <TitleEditor title={title} setTitle={setter.setTitle} />
            <TextEditor values={content} setValues={setter.setContent} />
          </li>
          <li className="mt-14">
            <SkillStackInput
              techStackDtos={techStackDtos}
              setTechStackDtos={setter.setTechStackDtos}
            />
          </li>
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">
              프로젝트 분야
              <span className="font-normal text-bs_18 ml-1">
                &#40;선택&#41;
              </span>
            </h2>
            {/* 중복 처리 필요 */}
            <InputTag
              value={field}
              setValue={setter.setfield as (value: string | string[]) => void}
            />
          </li>
          <li className="mt-14">
            <DistributionLink setLinkDtos={setter.setLinkDtos} />
          </li>
        </ul>
      </section>
      <section>
        <div className="flex justify-between mt-14 tablet:flex-col mobile:flex-col">
          <div className="mx-auto tablet:mb-36 mobile:mb-36 mobile:w-full">
            <h2 className="text-bs_20 my-5 font-bold">프로젝트 배너</h2>
            <ProjectBanner setThumbnail={setter.setThumbnail} />
          </div>
          <div className="mx-auto w-full pl-10 target:pl-0 mobile:pl-0">
            <h2 className="text-bs_20 my-5 font-bold">프로젝트 소개</h2>
            <textarea
              name="projectTextarea"
              id="projectTextarea"
              value={bannerContent}
              onChange={handleBannerContentChange}
              placeholder="프로젝트를 간략히 소개해주세요."
              rows={20}
              className="border border-gray30 rounded-bs_10 text-bs_14 p-2 w-full"
            />
          </div>
        </div>
        <div className="text-right mt-28">
          <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
          <CustomButton
            color="secondary"
            className="py-3 px-10"
            onClick={async () => {
              mutate();
            }}>
            작성
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
