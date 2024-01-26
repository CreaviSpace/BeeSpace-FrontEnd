import dynamic from 'next/dynamic';

import Classification from './recruitment/Classification';
import Communication from './recruitment/Communication';
import Deadline from './recruitment/Deadline';
import OnOffLine from './recruitment/OnOffLine';
import Period from './recruitment/Period';
import Personnel from './recruitment/Personnel';
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
        <ul className="my-20 grid grid-cols-2 gap-x-10">
          <li className="w-full">
            <Classification />
          </li>
          <li className="w-full">
            <OnOffLine />
          </li>
          <li className="w-full">
            <Personnel />
          </li>
          <li>
            <h2 className="text-bs_20 my-5">기술 스택</h2>
          </li>
          <li>
            <Period />
            <Communication />
          </li>
          <li className="w-full m-auto flex flex-col justify-center items-center">
            <Deadline />
          </li>
        </ul>
      </section>
      <section>
        <TitleEditor />
        <TextEditor />
      </section>
    </div>
  );
}
