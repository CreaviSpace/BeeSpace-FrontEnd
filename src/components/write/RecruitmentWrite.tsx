import dynamic from 'next/dynamic';

import CustomButton from '../button/CustomButton';
import Classification from './recruitment/Classification';
import Communication from './recruitment/Communication';
import Deadline from './recruitment/Deadline';
import OnOffLine from './recruitment/OnOffLine';
import Period from './recruitment/Period';
import Personnel from './recruitment/Personnel';
import SkillStack from './SkillStack';
import TitleEditor from './TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function RecruitmentWrite() {
  return (
    <div className="max-w-max_w m-auto p-20">
      <h1 className="text-center text-[2rem] font-bold">
        모집 정보를 입력해주세요
      </h1>

      <section>
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
            <SkillStack />
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
        <TitleEditor />
        <TextEditor />
      </section>

      <div className="text-right mt-10">
        <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
        <CustomButton color="secondary" className="py-3 px-10">
          작성
        </CustomButton>
      </div>
    </div>
  );
}
