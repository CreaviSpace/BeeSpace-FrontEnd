import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import SelectButton from '@/components/button/SelectButton';
import ProjectBanner from '@/components/write/project/ProjectBanner';
import SkillStackInput from '@/components/write/SkillStackInput';

export default function SignUp() {
  const [jopOptions, setJopOptions] = useState<string[]>([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);

  const [job, setJob] = useState<string[]>(['default']);
  const [stack, setStack] = useState<string[]>(['default', 'default']);
  const [profileUrl, setProfileUrl] = useState<string>('');
  const [interestedStack, setInterestedStack] = useState<
    {
      techStack: string;
      iconUrl?: string;
    }[]
  >([]);
  return (
    <main className="py-28">
      <section className="w-[300px] m-auto flex flex-col items-center">
        <h1 className="text-bs_20 font-bold">회원가입</h1>
        <ul className="w-full my-8">
          <li className="flex justify-center">
            <ProjectBanner
              hidden
              thumbnail={profileUrl}
              setThumbnail={setProfileUrl}
            />
          </li>

          <li className="flex flex-col gap-2">
            <label htmlFor="nickName">닉네임</label>
            <input
              type="text"
              id="nickName"
              placeholder="닉네임을 입력해 주세요."
              className="h-[3.125rem] text-bs_14 px-4 py-2 border border-gray30 rounded-bs_5"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="job">직무</label>
            <SelectButton
              option={jopOptions}
              setOption={setJopOptions as (option: (string | number)[]) => void}
              select={job}
              setSelect={setJob as (job: (string | number)[]) => void}
              index={0}
              className="border-gray30"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8 ">
            <label htmlFor="interestSkill">관심스택</label>
            <SkillStackInput
              techStackDtos={interestedStack}
              setTechStackDtos={setInterestedStack}
            />
          </li>
          <li className="w-full mt-8">
            <CustomButton color="primary" className="w-full h-12">
              가입하기
            </CustomButton>
          </li>
        </ul>
      </section>
    </main>
  );
}
