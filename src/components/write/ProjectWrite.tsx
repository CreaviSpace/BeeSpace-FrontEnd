import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import OnoffButton from '@/components/button/OnOffButton';
import useProjectDetail from '@/hooks/useProjectDetail';
import useWritePost from '@/hooks/useWritePost';
import useWriteUpdate from '@/hooks/useWriteUpdate';
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

interface IProjectWriteProps {
  id: string | undefined;
}

const commnuityList = [
  { key: 'INDIVIDUAL', name: '개인 프로젝트' },
  { key: 'TEAM', name: '팀 프로젝트' },
];

export default function ProjectWrite({ id }: IProjectWriteProps) {
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

  const projectData = {
    category,
    memberDtos,
    title,
    content,
    techStackDtos,
    field,
    linkDtos: linkDtos.filter((item) => item.url !== ''),
    thumbnail,
    bannerContent,
  };

  const { isLoading, isError, data, isFetching } = useProjectDetail(id);
  const { mutate: projectPost } = useWritePost('project', projectData);
  const { mutate: projectUpdate } = useWriteUpdate(
    parseInt(id as string),
    'project',
    projectData
  );

  useEffect(() => {
    if (!isLoading && id) {
      setter.setCategory(data.category);
      setter.setTitle(data.title);
      setter.setContent(data.content);
      setter.setfield(data.field || '');
      setter.setLinkDtos(data.links);
      setter.setThumbnail(data.thumbnail);
      setter.setBannerContent(data.bannerContent);
      if (data.techStacks && data.techStacks.length > 0) {
        const teachStackDtos: { techStackId: number }[] = [];
        data.techStacks.map(
          (item: {
            techStackId: number;
            techStack: string;
            iconUrl: string;
          }) => {
            teachStackDtos.push({ techStackId: item.techStackId });
          }
        );
        setter.setTechStackDtos(teachStackDtos);
      }
    } else {
      setter.setCategory('INDIVIDUAL');
      setter.setMemberDtos([{ memberId: 'default', position: 'default' }]);
      setter.setTitle('');
      setter.setContent('');
      setter.setTechStackDtos([]);
      setter.setfield('');
      setter.setLinkDtos([
        { linkType: 'web', url: '' },
        { linkType: 'android', url: '' },
        { linkType: 'ios', url: '' },
      ]);
      setter.setThumbnail('');
      setter.setBannerContent('');
    }
  }, [isFetching, id]);

  const handleBannerContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setter.setBannerContent(e.target.value);
  };

  return (
    <main className="max-w-max_w min-w-min_w m-auto p-20 mobile:p-6">
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
            <MemberList
              positions={!isLoading && id && data.positions}
              setMemberDtos={setter.setMemberDtos}
            />
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
            <InputTag
              value={field as string}
              setValue={setter.setfield as (value: string | string[]) => void}
            />
          </li>
          <li className="mt-14">
            <DistributionLink
              linkDtos={linkDtos}
              setLinkDtos={setter.setLinkDtos}
            />
          </li>
        </ul>
      </section>
      <section>
        <div className="flex justify-between mt-14 tablet:flex-col mobile:flex-col">
          <div className="mx-auto tablet:mb-36 mobile:mb-36 mobile:w-full">
            <h2 className="text-bs_20 my-5 font-bold">프로젝트 배너</h2>
            <ProjectBanner
              thumbnail={thumbnail}
              setThumbnail={setter.setThumbnail}
            />
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
              if (id && data.id) {
                projectUpdate();
              } else {
                projectPost();
              }
            }}>
            작성
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
