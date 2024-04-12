import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import useMemberProfileGet from '@/hooks/profile/useMemberProfileGet';

interface ILogInHeaderProps {
  MID: string;
  ACCESE_TOKEN: string;
}

export default function LogInHeader({ MID, ACCESE_TOKEN }: ILogInHeaderProps) {
  const [onProfileModal, setOnProfileModal] = useState(false);
  const [onWritingModal, setOnWritingModal] = useState(false);

  const profileModalRef = useRef<HTMLLIElement>(null);
  const writingModalRef = useRef<HTMLLIElement>(null);

  const router = useRouter();

  const { isLoading, data, isError, isFetching } = useMemberProfileGet(MID);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 모달이 열려 있을 때 모달의 바깥쪽을 누르면 창 닫기
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

    if (onProfileModal || onWritingModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onProfileModal, onWritingModal]);

  if (!MID && !ACCESE_TOKEN) {
    return null;
  }

  return (
    <ul className="flex items-center relative">
      {/* <li>
        <IoChatbubbleEllipsesOutline size={22} />
      </li> */}
      <li className="min_mobile:hidden">
        <CustomButton
          color="primary"
          className="py-2 px-3 ml-3"
          onFocus={() => setOnWritingModal(true)}
          onBlur={() => setOnWritingModal(false)}>
          글쓰기
        </CustomButton>
      </li>
      {isLoading ? (
        '로딩중'
      ) : data.profileUrl ? (
        <li
          className="ml-3 cursor-pointer"
          tabIndex={0}
          onFocus={() => setOnProfileModal(true)}
          onBlur={() => setOnProfileModal(false)}>
          <Image
            src={data.profileUrl}
            alt="유저 아이콘"
            width={40}
            height={40}
            className="rounded-full"
          />
        </li>
      ) : (
        <li
          className="ml-3 cursor-pointer"
          tabIndex={0}
          onFocus={() => setOnProfileModal(true)}
          onBlur={() => setOnProfileModal(false)}>
          <Image
            src="/img/user/default.avif"
            alt="유저 아이콘"
            width={40}
            height={40}
            className="rounded-full"
          />
        </li>
      )}

      {onProfileModal ? (
        <li
          ref={profileModalRef}
          className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14"
          onMouseDown={(e) => {
            e.preventDefault();
          }}>
          <button
            className="text-start hidden min_mobile:block"
            onClick={() => setOnWritingModal(true)}>
            글 작성하기
          </button>
          <Link href={`/profile/${MID}`}>내 프로필</Link>
          <Link href="/">알림</Link>
          <Link href="/">북마크</Link>
          <span className="w-full h-[1px] border block"></span>
          <button type="button" className="text-start">
            로그아웃
          </button>
        </li>
      ) : null}
      {onWritingModal ? (
        <li
          ref={writingModalRef}
          className="w-40 h-fit bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14"
          onMouseDown={(e) => {
            e.preventDefault();
          }}>
          <label
            htmlFor="write"
            className="text-center font-bold text-bs_16 hidden min_mobile:block">
            글 작성
          </label>
          <button
            className="text-start"
            onClick={() => router.push('/write/project')}>
            프로젝트 올리기
          </button>
          <button
            className="text-start"
            onClick={() => router.push('/write/recruitment')}>
            팀원 모집하기
          </button>
          <button
            className="text-start"
            onClick={() => router.push('/write/community')}>
            커뮤니티 글쓰기
          </button>
        </li>
      ) : null}
    </ul>
  );
}
