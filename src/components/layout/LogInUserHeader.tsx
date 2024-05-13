import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import useAlarm from '@/hooks/queries/alarm/useAlarm';
import useAlarmCount from '@/hooks/queries/alarm/useAlarmCount';
import useLoginCheck from '@/hooks/queries/login/useLoginCheck';
import useLoginModal from '@/store/modal/useLoginModal';
import useLogin from '@/store/useLogin';
import { getCookies } from '@/utils/cookie/getCookies';

import SkeletonUserImage from '../skeleton/SkeletonUserImage';
import AlarmModal from './modal/AlarmModal';
import ProfileModal from './modal/ProfileModal';
import WriteModal from './modal/WriteModal';

const MID = getCookies('MID', true);

export default function LogInHeader() {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);
  const [onAlarmModal, setOnAlarmModal] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const profileModalRef = useRef<HTMLDivElement>(null);
  const writingModalRef = useRef<HTMLDivElement>(null);
  const alarmModalRef = useRef<HTMLDivElement>(null);

  const { onOpen: openLogin } = useLoginModal();
  const { login } = useLogin();

  const { isLoading, data, isError, isFetching } = useLoginCheck();

  const {
    isLoading: alarmIsLoading,
    isError: alarmIsError,
    data: alarmData,
    isFetching: alarmIsFetching,
  } = useAlarm();

  const {
    isLoading: alarmCountIsLoading,
    isError: alarmCountIsError,
    data: alarmCounts,
    isFetching: alarmCountIsFetching,
  } = useAlarmCount();

  useEffect(() => {
    if (!alarmCountIsLoading && alarmCounts > 0) {
      setIsAlarm(true);
    }
  }, [alarmCountIsLoading]);

  const handleWriteModalOpen = () => {
    writingModalRef.current?.focus();
  };
  const handleAlarmModalOpen = () => {
    alarmModalRef.current?.focus();
  };

  const handleWriteModalToggle = () => {
    if (onWritingModal) {
      writingModalRef.current?.blur();
    } else {
      writingModalRef.current?.focus();
    }
    setOnWritingModal(!onWritingModal);
  };

  const handleProfileModalToggle = () => {
    if (onProfileModal) {
      profileModalRef.current?.blur();
    } else {
      profileModalRef.current?.focus();
    }
    setOnProfileModal(!onProfileModal);
  };

  return (
    <>
      {login ? (
        <ul className="flex items-center relative">
          <li className="min_mobile:hidden">
            <CustomButton
              color="primary"
              className="py-2 px-3"
              onClick={handleWriteModalToggle}
              onMouseDown={(e) => e.preventDefault()}>
              글쓰기
            </CustomButton>
          </li>
          {isLoading ? (
            <SkeletonUserImage />
          ) : (
            <li
              className="ml-3 cursor-pointer relative min_mobile:ml-0"
              tabIndex={0}
              onClick={handleProfileModalToggle}
              onMouseDown={(e) => e.preventDefault()}>
              <Image
                src={
                  data?.profileUrl ? data.profileUrl : '/img/user/default.avif'
                }
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
                setOnProfileModal={setOnProfileModal}
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
            {onWritingModal && (
              <WriteModal setOnWritingModal={setOnWritingModal} />
            )}
          </div>
          <div
            ref={alarmModalRef}
            tabIndex={0}
            onFocus={() => setOnAlarmModal(true)}
            onBlur={() => {
              setOnAlarmModal(false);
            }}>
            {onAlarmModal && (
              <AlarmModal
                isLoading={alarmIsLoading}
                isAlarm={alarmData}
                data={alarmData}
              />
            )}
          </div>
        </ul>
      ) : (
        <ul className="flex">
          <li>
            <CustomButton
              onClick={openLogin}
              className="py-2 px-4"
              color="primary">
              로그인
            </CustomButton>
          </li>
        </ul>
      )}
    </>
  );
}
