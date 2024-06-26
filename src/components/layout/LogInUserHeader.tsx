import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import useGetAlarm from '@/hooks/queries/alarm/useGetAlarm';
import useGetAlarmCount from '@/hooks/queries/alarm/useGetAlarmCount';
import useAuth from '@/hooks/queries/useAuth';
import useCookie from '@/hooks/useCookie';
import useLoginModal from '@/store/modal/useLoginModal';
import useLoginStore from '@/store/useLoginStore';

import SkeletonUserImage from '../skeleton/SkeletonUserImage';
import AlarmModal from './modal/AlarmModal';
import ProfileModal from './modal/ProfileModal';
import WriteModal from './modal/WriteModal';

export default function LogInHeader() {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);
  const [onAlarmModal, setOnAlarmModal] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

  const profileModalRef = useRef<HTMLDivElement>(null);
  const writingModalRef = useRef<HTMLDivElement>(null);
  const alarmModalRef = useRef<HTMLDivElement>(null);

  const { getCookies } = useCookie(['jwt', 'MID']);
  const MID = getCookies('MID');

  const { onOpen: openLogin } = useLoginModal();
  const { login, setLogin } = useLoginStore();

  const { getMyProfile } = useAuth();
  const { isLoading, data } = getMyProfile;

  const { isLoading: alarmIsLoading, data: alarmData } = useGetAlarm();

  const { isLoading: alarmCountIsLoading, data: alarmCounts } =
    useGetAlarmCount();

  useEffect(() => {
    if (!alarmCountIsLoading && alarmCounts > 0) {
      setIsAlarm(true);
    } else {
      setIsAlarm(false);
    }
  }, [alarmCountIsLoading, alarmCounts]);

  useEffect(() => {
    setLogin(getCookies('jwt'));
    if (onProfileModal) {
      setOnProfileModal(false);
    }
  }, [isLoading]);

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
                isAlarm={isAlarm}
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
