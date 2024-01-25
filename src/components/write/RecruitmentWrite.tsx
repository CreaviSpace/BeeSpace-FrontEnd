import dynamic from 'next/dynamic';

import Classification from './recruitment/Classification';
import OnOffLine from './recruitment/OnOffLine';
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
            <div>
              <h2 className="text-bs_20 my-5">진행 기간</h2>
            </div>
            <div>
              <h2 className="text-bs_20 my-5">연락 방법</h2>
            </div>
          </li>
          <li>
            <h2 className="text-bs_20 my-5">모집 마감</h2>
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
