import Link from 'next/link';
import React from 'react';

import UserProfilButton from '@/components/button/UserProfilButton';
import Tag from '@/components/Tag';

interface IDetailsTitleProps {
  type: string;
  time: number;
  views: number;
  field: string;
  title: string;
  comments: number;
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
  comments,
}: IDetailsTitleProps) {
  return (
    <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
      <Tag
        name="임시 카테고리"
        category="field"
        className={`${className} w-fit`}
      />
      <h1 className="font-bold text-bs_24 mb-8">{title}</h1>
      <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2">
        <UserProfilButton userName={`${userName}사용자`} />
        <div className="flex gap-x-3 text-bs_14 text-gray40">
          <p>
            조회수&nbsp;<span>{views}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            댓글&nbsp;<span>{comments}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            <time>{time}</time>
          </p>
        </div>
      </div>
      <span className="w-full border border-gray10" />
      <div className="text-bs_14 flex justify-end w-full px-4 py-2">
        <Link href={`write/${type}`}>
          <button>수정</button>
        </Link>
        <span className="mx-2" aria-hidden>
          &#124;
        </span>
        <button>삭제</button>
      </div>
    </div>
  );
}
