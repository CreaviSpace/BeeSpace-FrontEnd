import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import useAlarm from '@/hooks/alarm/useAlarm';
import useMemberProfileGet from '@/hooks/profile/useMemberProfileGet';
import useLoginModal from '@/store/modal/useLoginModal';
import useSignUpModal from '@/store/modal/useSignUpModal';
import useLogin from '@/store/useLogin';
import { getCookies } from '@/utils/getCookies';

import SkeletonUserImage from '../skeleton/SkeletonUserImage';
import AlarmModal from './modal/AlarmModal';
import ProfileModal from './modal/ProfileModal';
import WriteModal from './modal/WriteModal';

const MID = getCookies('MID', true);
const ACCESE_TOKEN = getCookies('jwt');

export default function LogInHeader() {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);
  const [onAlarmModal, setOnAlarmModal] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const profileModalRef = useRef<HTMLDivElement>(null);
  const writingModalRef = useRef<HTMLDivElement>(null);
  const alarmModalRef = useRef<HTMLDivElement>(null);

  const { onOpen: openLogin } = useLoginModal();
  const { onOpen: openSignUp } = useSignUpModal();
  const { login } = useLogin();

  const { isLoading, data, isError, isFetching } = useMemberProfileGet(MID);
  const {
    isLoading: alarmIsLoading,
    isError: alarmIsError,
    data: alarmData,
    isFetching: alarmIsFetching,
  } = useAlarm();

  useEffect(() => {
    if (!alarmIsLoading && alarmData?.length > 0) {
      setIsAlarm(true);
    }
  }, [alarmIsLoading]);

  const handleWriteModalOpen = () => {
    writingModalRef.current?.focus();
  };
  const handleAlarmModalOpen = () => {
    alarmModalRef.current?.focus();
  };

  if (!login) {
    return (
      <ul className="flex">
        <li>
          <CustomButton
            onClick={openLogin}
            className="py-2 px-4"
            color="primary">
            로그인
          </CustomButton>
        </li>
        <li className="ml-5 mobile:hidden">
          <CustomButton onClick={openSignUp} className="py-2 px-3">
            회원가입
          </CustomButton>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex items-center relative">
      <li className="min_mobile:hidden">
        <CustomButton
          color="primary"
          className="py-2 px-3"
          onClick={() => writingModalRef.current?.focus()}>
          글쓰기
        </CustomButton>
      </li>
      {isLoading ? (
        <SkeletonUserImage />
      ) : (
        <li
          className="ml-3 cursor-pointer relative min_mobile:ml-0"
          tabIndex={0}
          onClick={() => profileModalRef.current?.focus()}>
          <Image
            src={data?.profileUrl ? data.profileUrl : '/img/user/default.avif'}
            alt="유저 아이콘"
            width={40}
            height={40}
            className="rounded-full"
          />
          {isAlarm && (
            <div className="absolute top-[0.125rem] right-[0.125rem] w-2 h-2 rounded-full bg-green-400"></div>
          )}
        </li>
      )}

      <div
        ref={profileModalRef}
        tabIndex={0}
        onFocus={() => setOnProfileModal(true)}
        onBlur={() => setOnProfileModal(false)}>
        {onProfileModal && (
          <ProfileModal
            handleWriteModalOpen={handleWriteModalOpen}
            handleAlarmModalOpen={handleAlarmModalOpen}
            MID={MID}
            isAlarm={isAlarm}
          />
        )}
      </div>
      <div
        ref={writingModalRef}
        tabIndex={0}
        onFocus={() => setOnWritingModal(true)}
        onBlur={() => setOnWritingModal(false)}>
        {onWritingModal && <WriteModal />}
      </div>
      <div
        ref={alarmModalRef}
        tabIndex={0}
        onFocus={() => setOnAlarmModal(true)}
        onBlur={() => {
          setOnAlarmModal(false);
        }}>
        {onAlarmModal && (
          <AlarmModal isLoading={alarmIsLoading} data={alarmData} />
        )}
      </div>
    </ul>
  );
}
