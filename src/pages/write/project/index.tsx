import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import OnoffButton from '@/components/button/OnOffButton';
import useProjectDetail from '@/hooks/queries/project/useProjectDetail';
import useWritePost from '@/hooks/queries/useWritePost';
import useWriteUpdate from '@/hooks/queries/useWriteUpdate';
import useProjectData from '@/store/useProjectData';

import InputTag from '../../../components/write/communtiy/InputTag';
import DistributionLink from '../../../components/write/project/DistributionLink';
import MemberList from '../../../components/write/project/MemberList';
import ProjectBanner from '../../../components/write/project/ProjectBanner';
import SkillStackInput from '../../../components/write/SkillStackInput';
import TitleEditor from '../../../components/write/TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

const COMMNUITYLIST = [
  { key: 'INDIVIDUAL', name: '개인 프로젝트' },
  { key: 'TEAM', name: '팀 프로젝트' },
];

export default function ProjectWrite() {
  const router = useRouter();
  const { id } = router.query;

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
    images,
    setter,
  } = useProjectData();

  const projectData = {
    category,
    memberDtos,
    title,
    content,
    techStackDtos: techStackDtos.map((item) => {
      const { techStack } = item;
      return { techStack };
    }),
    field: typeof field === 'string' ? field : field[0],
    linkDtos: linkDtos.filter((item) => item.url !== ''),
    thumbnail,
    bannerContent,
    images,
  };

  const { isLoading, isError, data, isFetching } = useProjectDetail(
    id as string
  );
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
        const teachStackDtos: { techStack: string; iconUrl: string }[] = [];
        data.techStacks.map((item: { techStack: string; iconUrl: string }) => {
          teachStackDtos.push({
            techStack: item.techStack,
            iconUrl: item.iconUrl,
          });
        });
        setter.setTechStackDtos(teachStackDtos);
      }
      if (data.images && data.images.length > 0) {
        data.images.map((item: string) => {
          setter.setImages(item);
        });
      }
    } else {
      setter.setCategory('INDIVIDUAL');
      setter.setMemberDtos([{ memberId: '', position: '' }]);
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
      // setter.setImages('');
    }
  }, [isFetching, id]);

  const handleBannerContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setter.setBannerContent(e.target.value);
  };

  return (
    <main className="max-w-max_w min-w-min_w min-h-min_h m-auto p-20 mobile:p-6">
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
              list={COMMNUITYLIST}
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
            <TextEditor
              values={content}
              setValues={setter.setContent}
              setImages={setter.setImages}
            />
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
          <div className="mx-auto mobile:w-full">
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
