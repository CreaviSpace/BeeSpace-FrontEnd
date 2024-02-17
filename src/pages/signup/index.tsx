import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CustomSelect from '@/components/button/CustomSelect';

export default function SignUp() {
  const [personnel, setPersonnel] = useState<string[]>(['default', 'default']);
  const [jopOption, setJobOption] = useState([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);

  return (
    <main className="py-28">
      <section className="w-[300px] m-auto flex flex-col items-center">
        <h1 className="text-bs_20 font-bold">회원가입</h1>
        <ul className="w-full my-8">
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
            <CustomSelect
              option={jopOption}
              select={personnel}
              setSelect={
                setPersonnel as (personnel: (string | number)[]) => void
              }
              index={1}
              className="border-gray30"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8 ">
            <label htmlFor="interestSkill">관심스택</label>
            <select
              name="skill"
              id="interestSkill"
              className="border border-gray30 px-4 py-2 rounded-bs_5 h-[3.125rem] ">
              <option value="select">선택해주세요</option>
              <option value="Javascript">Javascript</option>
              <option value="React">React</option>
              <option value="Java">Java</option>
            </select>
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
