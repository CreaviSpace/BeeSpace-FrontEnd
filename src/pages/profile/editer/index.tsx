import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CustomSelect from '@/components/button/CustomSelect';
import useMemberProfileGet from '@/hooks/profile/useMemberProfileGet';
import useMyProfilePost from '@/hooks/profile/useMyProfilePost';
import { getCookies } from '@/utils/getCookies';

const MEMBERID = 2;

export default function ProfileEdit() {
  const { isLoading, data } = useMemberProfileGet(2);

  const [profileUrl, setProfileUrl] = useState<string>('');
  const [position, setPosition] = useState<string[]>(['없음', 'default']);
  const [career, setCareer] = useState<string[]>(['없음', 'default']);
  const [interestedStack, setInterestedStack] = useState<string[]>([
    '없음',
    'default',
  ]);
  const [nickName, setNameValue] = useState<string>('');
  const [introduce, setintroduce] = useState<string>('');

  const [jopOption] = useState(['백엔드', '프론트엔드', '디자이너', '기획']);
  const [careerOption] = useState([
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
  const [skillOption] = useState([
    'Java',
    'Javascript',
    'Spring',
    'HTML/CSS',
    'jQuery',
    'JSp',
    'Vue.js',
    'Oracle',
    'MySQL',
    'React',
    'Spring Boot',
    'PHP',
    'Python',
    'Node,js',
    'C#',
  ]);

  const router = useRouter();
  const closeButton = () => router.replace(`/profile`);

  useEffect(() => {
    if (isLoading === false) {
      setPosition(data.memberPosition);
      setCareer(data.memberCareer);
      setInterestedStack(data.memberInterestedStack);
      setNameValue(data.memberNickname);
      setintroduce(data.memberIntroduce);
      setProfileUrl(data.profileUrl);
    }
  }, [isLoading, MEMBERID]);

  const handlerExpireMember = async () => {
    return await axios.post(`${process.env.BASE_URL}/member/mypage/edit`, {
      headers: { Authorization: getCookies('jwt') },
    });
  };

  const handleNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleIntroduceValueChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setintroduce(e.target.value);
  };

  const newContent = {
    nickName,
    introduce,
    position: position[0],
    career: parseInt(career[0]),
    interestedStack,
    profileUrl,
  };

  const { mutate } = useMyProfilePost(newContent);

  return (
    <main className="py-28">
      <section className="w-[600px] m-auto flex flex-col items-center">
        <h1 className="sr-only">프로필 수정</h1>
        <Image
          src={profileUrl}
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
              className="px-4 py-3 border border-gray30 rounded-bs_5"
              value={nickName}
              onChange={handleNameValueChange}
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="introduction">자기소개</label>
            <textarea
              name="introduction"
              id="introduction"
              placeholder="자신을 소개해 주세요."
              className="p-4 border border-gray30 rounded-bs_5"
              value={introduce}
              onChange={handleIntroduceValueChange}
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="job">직무</label>
            <CustomSelect
              htmlFor="job"
              option={jopOption}
              select={position}
              setSelect={setPosition as (position: (string | number)[]) => void}
              index={1}
              className="border-gray30"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="career">경력</label>
            <CustomSelect
              htmlFor="career"
              option={careerOption}
              select={career}
              setSelect={setCareer as (career: (string | number)[]) => void}
              index={1}
              className="border-gray30"
            />
          </li>
          <li className="flex flex-col gap-2 mt-8">
            <label htmlFor="interestSkill">관심스택</label>
            <CustomSelect
              htmlFor="interestSkill"
              option={skillOption}
              select={interestedStack}
              setSelect={
                setInterestedStack as (
                  interestedStack: (string | number)[]
                ) => void
              }
              index={1}
              className="border-gray30"
            />
            <ul className="flex gap-1">
              {interestedStack.map((item, index) => (
                <li key={index} className="flex flex-col items-center">
                  <p className="text-bs_15 bg-white border border-gray30 w-fit py-[1px] px-2 rounded-full">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </li>
          <li className="text-right mt-14">
            <CustomButton className="py-2 px-5 mr-3" onClick={closeButton}>
              취소
            </CustomButton>
            <CustomButton
              color="secondary"
              className="py-2 px-5"
              onClick={() => mutate()}>
              확인
            </CustomButton>
          </li>
        </ul>
        <span className="w-full h-[1px] bg-gray10"></span>
        <div className="w-full flex justify-between my-10">
          <CustomButton className="py-1 px-3" onClick={handlerExpireMember}>
            회원탈퇴
          </CustomButton>
        </div>
      </section>
    </main>
  );
}
