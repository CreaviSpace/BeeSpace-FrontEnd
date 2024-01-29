import { IoChatbubbleEllipsesOutline } from '@react-icons/all-files/io5/IoChatbubbleEllipsesOutline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';

interface ILogInHeaderProps {
  onClick: (event: React.MouseEvent) => void;
}

export default function LogInHeader({ onClick }: ILogInHeaderProps) {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);

  const profileModalRef = useRef<HTMLLIElement | null>(null);
  const writingModalRef = useRef<HTMLLIElement | null>(null);

  const handleProfileModal = () => {
    setOnProfileModal(!onProfileModal);
  };

  const handleWritingModal = () => {
    setOnWritingModal(!onWritingModal);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        (onProfileModal &&
          profileModalRef.current &&
          !profileModalRef.current.contains(e.target as Node)) ||
        (onWritingModal &&
          writingModalRef.current &&
          !writingModalRef.current.contains(e.target as Node))
      ) {
        setOnProfileModal(false);
        setOnWritingModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onProfileModal, onWritingModal]);

  return (
    <ul className="flex items-center relative">
      <li>
        <IoChatbubbleEllipsesOutline size={22} />
      </li>
      <li>
        <CustomButton
          color="primary"
          className="py-2 px-3 ml-3"
          onClick={handleWritingModal}>
          글쓰기
        </CustomButton>
      </li>
      <li className="ml-3 cursor-pointer" onClick={handleProfileModal}>
        <Image
          src="/img/user/default.avif"
          alt="유저 아이콘"
          width={40}
          height={40}
          className="rounded-full"
        />
      </li>
      {onProfileModal ? (
        <li
          ref={profileModalRef}
          className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute bottom-[-150px] right-0 flex flex-col gap-y-2 p-3 text-bs_14">
          <Link href="/">내 프로필</Link>
          <Link href="/">알림</Link>
          <Link href="/">북마크</Link>
          <span className="w-full h-[1px] border block"></span>
          <button onClick={onClick} type="button" className="text-start">
            로그아웃
          </button>
        </li>
      ) : null}
      {onWritingModal ? (
        <li
          ref={writingModalRef}
          className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute bottom-[-110px] right-0 flex flex-col gap-y-2 p-3 text-bs_14">
          <Link href="/">프로젝트 올리기</Link>
          <Link href="/">팀원 모집하기</Link>
          <Link href="/">커뮤니티 글스기</Link>
        </li>
      ) : null}
    </ul>
  );
}
