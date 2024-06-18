import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import SelectButton from '@/components/button/SelectButton';
import ProjectBanner from '@/components/write/project/ProjectBanner';
import SkillStackInput from '@/components/write/SkillStackInput';
import useGetProfileMember from '@/hooks/queries/profile/useGetProfileMember';
import useMutateUpdateProfile from '@/hooks/queries/profile/useMutateUpdateProfile';
import useAuth from '@/hooks/queries/useAuth';
import useCookie from '@/hooks/useCookie';
import useProfileData from '@/store/useProfile';

export default function ProfileEdit() {
  const [MID, setMid] = useState('');
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

  const { getCookies } = useCookie(['MID']);

  const {
    enabled,
    nickName,
    introduce,
    position,
    career,
    interestedStack,
    profileUrl,
    setter,
  } = useProfileData();

  const profileData = {
    nickName,
    introduce,
    position: position[0],
    career: parseInt(career[0].split('년')[0]),
    interestedStack: interestedStack,
    profileUrl,
  };

  const { isLoading, data } = useGetProfileMember(MID);
  const { mutate } = useMutateUpdateProfile(profileData);
  const { expire } = useAuth();

  const router = useRouter();

  const closeButton = () => router.replace(`/profile/${MID}`);

  useEffect(() => {
    setMid(getCookies('MID'));
  }, []);

  useEffect(() => {
    if (!isLoading && MID) {
      setter.setEnabled(data.enabled);
      setter.setNickName(data.memberNickname);
      setter.setIntroduce(data.memberIntroduce);
      setter.setPosition([data.memberPosition]);
      setter.setCareer([`${data.memberCareer}년`]);
      const processedData = data?.memberInterestedStack.map(
        (item: { techStack: string; iconUrl: string }) => ({
          techStack: item.techStack,
          iconUrl: item.iconUrl,
        })
      );
      setter.setInterestedStack(processedData);
      setter.setProfileUrl(data.profileUrl);
    } else {
      setter.setEnabled(null);
      setter.setNickName('');
      setter.setIntroduce('');
      setter.setPosition(['default']);
      setter.setCareer(['0년']);
      setter.setInterestedStack([]);
      setter.setProfileUrl('');
    }
  }, [isLoading, data]);

  const handlerExpireMember = async () => {
    expire.mutate();
  };

  const handleNameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter.setNickName(e.target.value);
  };

  const handleIntroduceValueChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setter.setIntroduce(e.target.value as string);
  };

  return (
    <main className="py-28  min-h-min_h">
      {isLoading ? null : (
        <section className="w-[600px] mobile:w-full p-6 m-auto flex flex-col items-center">
          <h1 className="sr-only">프로필 수정</h1>
          <ul className="w-full my-8">
            <li className="flex justify-center">
              <ProjectBanner
                hidden
                thumbnail={profileUrl}
                setThumbnail={setter.setProfileUrl}
                aspect={1 / 1}
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
                option={jobOption}
                setOption={
                  setJobOption as (option: (string | number)[]) => void
                }
                select={position}
                setSelect={
                  setter.setPosition as (position: (string | number)[]) => void
                }
                index={0}
                className="border-gray30"
              />
            </li>
            <li className="flex flex-col gap-2 mt-8">
              <h2 className="font-bold">경력</h2>
              <SelectButton
                option={careerOption}
                setOption={
                  setCareerOption as (option: (string | number)[]) => void
                }
                select={career}
                setSelect={
                  setter.setCareer as (career: (string | number)[]) => void
                }
                index={0}
                className="border-gray30"
              />
            </li>
            <li className="flex flex-col gap-2 mt-8">
              <h2 className="font-bold">관심스택</h2>
              <SkillStackInput
                techStackDtos={interestedStack}
                setTechStackDtos={setter.setInterestedStack}
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
              {enabled ? '회원탈퇴' : '회원탈퇴 취소'}
            </CustomButton>
          </div>
        </section>
      )}
    </main>
  );
}
