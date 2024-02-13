import Image from 'next/image';
import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CustomSelect from '@/components/button/CustomSelect';

export default function ProfileEdit() {
  const [personnel, setPersonnel] = useState<string[]>(['default', 'default']);
  const [jopOption, setJobOption] = useState([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);
  const [careerOption, setCareerOption] = useState([
    '없음',
    '1년',
    '2년',
    '3년',
    '4년',
    '5년',
    '6년',
    '7년',
    '8년',
    '9년',
    '10년 이상',
  ]);
  return (
    <main className="py-28">
      <section className="w-[600px] m-auto flex flex-col items-center">
        <h1 className="sr-only">프로필 수정</h1>
        <Image
          src="/img/user/default.avif"
          alt="유저 사진"
          width={100}
          height={100}
          className="rounded-full"
        />
        <ul className="w-full my-8">
          <li className="flex flex-col gap-2">
            <label htmlFor="nickName">닉네임</label>
            <input
              type="text"
              id="nickName"
              placeholder="닉네임을 기재해 주세요."
              className="px-4 py-2 border border-gray30 rounded-bs_5"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="introduction">자기소개</label>
            <input
              type="text"
              id="introduction"
              placeholder="자신을 소개해 주세요."
              className="px-4 py-2 border border-gray30 rounded-bs_5"
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
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="career">경력</label>
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
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="interestSkill">관심스택</label>
            <select
              name="skill"
              id="interestSkill"
              className="border border-gray30 px-4 py-2 rounded-bs_5">
              <option value="select">선택해주세요</option>
              <option value="Javascript">Javascript</option>
              <option value="React">React</option>
              <option value="Java">Java</option>
            </select>
          </li>
          <li className="text-right mt-14">
            <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
            <CustomButton color="secondary" className="py-3 px-10">
              확인
            </CustomButton>
          </li>
        </ul>
        <span className="w-full h-[1px] bg-gray30"></span>
        <div className="w-full flex justify-between my-8">
          <CustomButton className="py-2 px-5">회원탈퇴</CustomButton>
          <CustomButton className="py-2 px-5">비밀번호 변경</CustomButton>
        </div>
      </section>
    </main>
  );
}
