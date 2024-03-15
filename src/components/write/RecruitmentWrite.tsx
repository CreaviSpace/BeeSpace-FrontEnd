import dynamic from 'next/dynamic';

import CustomButton from '@/components/button/CustomButton';
import Classification from '@/components/write/recruitment/Classification';
import Communication from '@/components/write/recruitment/Communication';
import Deadline from '@/components/write/recruitment/Deadline';
import OnOffLine from '@/components/write/recruitment/OnOffLine';
import Period from '@/components/write/recruitment/Period';
import Personnel from '@/components/write/recruitment/Personnel';
import SkillStackInput from '@/components/write/SkillStackInput';
import TitleEditor from '@/components/write/TextEditor/TitleEditor';
import useRecruitData from '@/store/useRecruitData';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function RecruitmentWrite() {
  const { techStacks, title, content, setter } = useRecruitData();
  return (
    <main className="max-w-max_w m-auto p-20">
      <section>
        <h1 className="text-center text-[2rem] font-bold">
          모집 정보를 입력해주세요
        </h1>
        <ul className="my-20 grid grid-cols-2 gap-x-20">
          <li className="mt-14">
            <Classification />
          </li>
          <li className="mt-14">
            <OnOffLine />
          </li>
          <li className="mt-14">
            <Personnel />
          </li>
          <li className="mt-14">
            <SkillStackInput
              techStackDtos={techStacks}
              setTechStackDtos={setter.setTechStacks}
            />
          </li>
          <li className="mt-14">
            <Period />
            <Communication />
          </li>
          <li className="mt-14">
            <Deadline />
          </li>
        </ul>
      </section>
      <section>
        <TitleEditor title={title} setTitle={setter.setTitle} />
        <TextEditor values={content} setValues={setter.setContent} />
      </section>

      <div className="text-right mt-10">
        <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
        <CustomButton color="secondary" className="py-3 px-10">
          작성
        </CustomButton>
      </div>
    </main>
  );
}
