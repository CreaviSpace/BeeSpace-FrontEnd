import Link from 'next/link';
import React from 'react';

import UserProfileButton from '@/components/button/UserProfileButton';
import Tag from '@/components/Tag';
import useLikeView from '@/hooks/useLikeView';
import useWriteDelete from '@/hooks/useWriteDelete';
import useReconfirmModal from '@/store/modal/useReconfirmModal';
import useReportModal from '@/store/modal/useReportModal';
import useLogin from '@/store/useLogin';
import { getCookies } from '@/utils/getCookies';
import { parseValue } from '@/utils/parseValue';

interface IDetailsTitleProps {
  type: string;
  time: string;
  views: number;
  title: string;
  userName: string;
  className?: string;
  category?: string;
  id: number;
  imageURL?: string;
  memberId: string;
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
  imageURL,
  memberId,
}: IDetailsTitleProps) {
  const { login } = useLogin();
  const MID = getCookies('MID', true);

  const { onOpen: reportOpen, setReportTitle } = useReportModal();
  const {
    onOpen: reconfirmOpen,
    setTitle,
    setHandlerFunction,
  } = useReconfirmModal();
  const { mutate } = useWriteDelete(id, type);

  const { isLoading, isError, data, isFetching } = useLikeView(
    id,
    type.toUpperCase()
  );

  const onlyDate = time?.split('T')[0];

  const handleDelete = () => {
    setTitle(`${parseValue(type.toUpperCase())}을 삭제하시겠습니다.`);
    setHandlerFunction(() => mutate());
    reconfirmOpen();
  };

  const handleReport = () => {
    setReportTitle(title);
    reportOpen();
  };

  return (
    <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
      {category && (
        <Tag name={category} category="field" className={`${className}`} />
      )}
      <h1 className="font-bold text-bs_24 mb-3">{title}</h1>
      <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2 gap-2 min_mobile:flex-col min_mobile:items-start">
        <UserProfileButton userName={userName} imageURL={imageURL} />
        <div className="flex flex-wrap items-center gap-x-3 text-bs_14 text-gray40 min_mobile:gap-x-1">
          <p>
            조회수&nbsp;<span>{views}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            좋아요&nbsp;<span>{isLoading ? 0 : data?.likeCount}</span>
          </p>
          <span aria-hidden>|</span>
          <p>
            <time dateTime={time}>{onlyDate}</time>
          </p>
        </div>
      </div>
      <span className="w-full border border-gray10 block" />

      {login && MID === memberId && (
        <div className="text-bs_14 flex justify-end w-full px-4 py-2">
          <Link
            href={`/write/${type.toLowerCase() === 'recruit' ? 'recruitment' : type}?id=${id}`}>
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
      )}
    </div>
  );
}
