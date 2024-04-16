import Link from 'next/link';
import React from 'react';

import UserProfileButton from '@/components/button/UserProfileButton';
import Tag from '@/components/Tag';
import useLikeView from '@/hooks/useLikeView';
import useReconfirmModal from '@/store/useReconfirmModal';
import useReportModal from '@/store/useReportModal';

interface IDetailsTitleProps {
  type: string;
  time: string;
  views: number;
  title: string;
  userName: string;
  className?: string;
  category?: string;
  id: number;
}

export default function DetailsTitle({
  type,
  time,
  title,
  views,
  className,
  userName,
  category,
  id,
}: IDetailsTitleProps) {
  const { onOpen: reportOpen, setReportTitle } = useReportModal();
  const { onOpen: reconfirmOpen, setPostType, setId } = useReconfirmModal();

  const { isLoading, isError, data, isFetching } = useLikeView(
    id,
    type.toUpperCase()
  );

  const handleDelete = () => {
    setId(id);
    setPostType(type);
    reconfirmOpen();
  };

  const handleReport = () => {
    setReportTitle(title);
    reportOpen();
  };

  return (
    <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
      <Tag name={category} category="field" className={`${className}`} />
      <h1 className="font-bold text-bs_24 mb-3">{title}</h1>
      <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2 gap-2 min_mobile:flex-col min_mobile:items-start">
        <UserProfileButton userName={userName} />
        <div className="flex gap-x-3 text-bs_14 text-gray40">
          <p>
            조회수&nbsp;<span>{views}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            좋아요&nbsp;<span>{!isLoading && data?.likeCount}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            <time dateTime={time}>{time}</time>
          </p>
        </div>
      </div>
      <span className="w-full border border-gray10 block" />
      <div className="text-bs_14 flex justify-end w-full px-4 py-2">
        <Link href={`/write/${type}?id=${id}`}>
          <button>수정</button>
        </Link>
        <span className="mx-2" aria-hidden>
          &#124;
        </span>
        <button onClick={handleDelete}>삭제</button>
        <span className="mx-2" aria-hidden>
          &#124;
        </span>
        <button onClick={handleReport}>신고</button>
      </div>
    </div>
  );
}
