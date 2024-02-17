import Link from 'next/link';
import React from 'react';

import UserProfileButton from '@/components/button/UserProfileButton';
import Tag from '@/components/Tag';
import useReconfirmModal from '@/hooks/useReconfirmModal';
import useReportModal from '@/hooks/useReportModal';

interface IDetailsTitleProps {
  type?: string;
  time: string;
  views: number;
  title: string;
  likes: number;
  userName: string;
  className?: string;
}

export default function DetailsTitle({
  type,
  time,
  title,
  views,
  className,
  userName,
  likes,
}: IDetailsTitleProps) {
  const { onOpen: reportOpen } = useReportModal();
  const { onOpen: reconfirmOpen } = useReconfirmModal();

  return (
    <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
      <Tag
        name="임시 카테고리"
        category="field"
        className={`${className} w-fit`}
      />
      <h1 className="font-bold text-bs_24 mb-3">{title}</h1>
      <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2">
        <UserProfileButton userName={userName} />
        <div className="flex gap-x-3 text-bs_14 text-gray40">
          <p>
            조회수&nbsp;<span>{views}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            좋아요&nbsp;<span>{likes}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            <time dateTime={time}>{time}</time>
          </p>
        </div>
      </div>
      <span className="w-full border border-gray10 block" />
      <div className="text-bs_14 flex justify-end w-full px-4 py-2">
        <Link href={`write/${type}`}>
          <button>수정</button>
        </Link>
        <span className="mx-2" aria-hidden>
          &#124;
        </span>
        <button onClick={reconfirmOpen}>삭제</button>
        <span className="mx-2" aria-hidden>
          &#124;
        </span>
        <button onClick={reportOpen}>신고</button>
      </div>
    </div>
  );
}
