import axios from 'axios';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import SelectButton from '@/components/button/SelectButton';
import ProjectBanner from '@/components/write/project/ProjectBanner';
import useMemberProfileGet from '@/hooks/profile/useMemberProfileGet';
import useMyProfileEditor from '@/hooks/profile/useMyProfileEditor';
import { getCookies } from '@/utils/getCookies';

import SkillStackInput from './../../../components/write/SkillStackInput';

const MID = getCookies('MID', true);

export default function ProfileEdit() {
  const { isLoading, data } = useMemberProfileGet(MID);

  const [profileUrl, setProfileUrl] = useState<string>('');
  const [nickName, setNameValue] = useState<string>('');
  const [introduce, setintroduce] = useState<string>('');
  const [position, setPosition] = useState<string[]>(['default']);
  const [career, setCareer] = useState<string[]>(['0년']);
  const [interestedStack, setInterestedStack] = useState<
    { techStack: string; iconUrl?: string }[]
  >([]);

  const [jobOption, setJobOption] = useState([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);

  const [careerOption, setCareerOption] = useState([
    '0년',
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

  const router = useRouter();
  const closeButton = () => router.replace(`/profile/${MID}`);

  useEffect(() => {
    if (isLoading === false) {
      setPosition([data.memberPosition]);
      setCareer([`${data.memberCareer}년`]);
      setInterestedStack([...data.memberInterestedStack]);
      setNameValue(data.memberNickname);
      setintroduce(data.memberIntroduce);
      setProfileUrl(data.profileUrl);
    }
  }, [isLoading, MID]);

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
    career: parseInt(career[0].split('년')[0]),
    interestedStack: interestedStack,
    profileUrl,
  };

  const { mutate } = useMyProfileEditor(newContent);

  return (
    <main className="py-28">
      {isLoading ? (
        <></>
      ) : (
        <section className="w-[600px] mobile:w-full p-6 m-auto flex flex-col items-center">
          <h1 className="sr-only">프로필 수정</h1>
          <ul className="w-full my-8">
            <li className="flex justify-center">
              <ProjectBanner
                hidden
                thumbnail={profileUrl}
                setThumbnail={setProfileUrl}
              />
            </li>
            <li className="flex flex-col gap-2 mt-10">
              <label htmlFor="nickName" className="font-bold">
                닉네임
              </label>
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
              <label htmlFor="introduction" className="font-bold">
                자기소개
              </label>
              <textarea
                name="introduction"
                id="introduction"
                placeholder="자신을 소개해 주세요."
                className="p-4 border border-gray30 rounded-bs_5 resize-none"
                value={introduce}
                onChange={handleIntroduceValueChange}
              />
            </li>
            <li className="flex flex-col gap-2 mt-8">
              <label htmlFor="job" className="font-bold">
                직무
              </label>
              <SelectButton
                htmlFor="job"
                option={jobOption}
                setOption={
                  setJobOption as (option: (string | number)[]) => void
                }
                select={position}
                setSelect={
                  setPosition as (position: (string | number)[]) => void
                }
                index={0}
                className="border-gray30"
              />
            </li>
            <li className="flex flex-col gap-2 mt-8">
              <h2 className="font-bold">경력</h2>
              <SelectButton
                htmlFor="career"
                option={careerOption}
                setOption={
                  setCareerOption as (option: (string | number)[]) => void
                }
                select={career}
                setSelect={setCareer as (career: (string | number)[]) => void}
                index={0}
                className="border-gray30"
              />
            </li>
            <li className="flex flex-col gap-2 mt-8">
              <h2 className="font-bold">관심스택</h2>
              <SkillStackInput
                techStackDtos={interestedStack}
                setTechStackDtos={setInterestedStack}
                hidden
              />
            </li>
            <li className="text-right mt-14">
              <CustomButton className="py-2 px-5 mr-3" onClick={closeButton}>
                취소
              </CustomButton>
              <CustomButton
                color="secondary"
                className="py-2 px-5"
                onClick={() => {
                  mutate();
                }}>
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
      )}
    </main>
  );
}
