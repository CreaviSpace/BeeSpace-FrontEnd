import { IoChatbubbleEllipsesOutline } from '@react-icons/all-files/io5/IoChatbubbleEllipsesOutline';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';

interface ILogInUserHeaderProps {
  onClick: (event: React.MouseEvent) => void;
}

export default function LogInUserHeader({ onClick }: ILogInUserHeaderProps) {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);

  const node = useRef<HTMLUListElement | null>(null);

  const handleProfileModal = () => {
    setOnProfileModal(!onProfileModal);
  };
  const handleWritingModal = () => {
    setOnWritingModal(!onWritingModal);
  };

  useEffect(() => {
    // 모달 외부 영역을 클릭할 경우 모달창을 닫는 이벤트 함수
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (onProfileModal || onWritingModal) &&
        node.current &&
        !node.current.contains(e.target as Node)
      ) {
        setOnWritingModal(false);
        setOnProfileModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onProfileModal, onWritingModal]);

  return (
    <ul className="flex items-center relative" ref={node}>
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
        <li className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute bottom-[-150px] right-0 flex flex-col gap-y-2 p-3 text-bs_14">
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
        <li className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute bottom-[-110px] right-0 flex flex-col gap-y-2 p-3 text-bs_14">
          <Link href="/">프로젝트 올리기</Link>
          <Link href="/">팀원 모집하기</Link>
          <Link href="/">커뮤니티 글스기</Link>
        </li>
      ) : null}
    </ul>
  );
}
