import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { IReportType } from '@/types/global';

interface IReportContentProps {
  item: IReportType;
}

export default function ReportContent({ item }: IReportContentProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const [isArrow, setIsArrow] = useState(true);

  const handleMelodeon = () => {
    if (ulRef.current) {
      if (ulRef.current.style.display === 'table-cell') {
        ulRef.current.style.display = 'none';
        setIsArrow(true);
      } else {
        ulRef.current.style.display = 'table-cell';
        setIsArrow(false);
      }
    }
  };

  return (
    <>
      <ul className="flex w-full relative border-y border-black bg-blue10 ">
        <li className="p-4 w-[25%]">{item.id}</li>
        <li className="p-4 w-[25%] mobile:hidden">{item.createdDate}</li>
        <li className="p-4 w-[25%] mobile:w-[50%]">{item.category}</li>
        <li className="absolute right-0 p-4 ">
          {isArrow ? (
            <FaChevronDown
              size={20}
              className="cursor-pointer"
              onClick={handleMelodeon}
            />
          ) : (
            <FaChevronUp
              size={20}
              className="cursor-pointer"
              onClick={handleMelodeon}
            />
          )}
        </li>
      </ul>

      <ul className="bg-white hidden w-fit" ref={ulRef}>
        <li className="p-4">
          <span className="font-bold">신고 유형 : </span>
          {item.category}
        </li>
        <li className="p-4">
          <span className="font-bold">신고한 계정 : </span>
          {item.member.memberName}
        </li>
        <li className="p-4">
          <span className="font-bold">신고받은 게시글 : </span>
          {item.postId}
        </li>
        <li className="p-4">
          <Link href={`/${item.postType}/${item.postId}`} className="font-bold">
            게시글 이동
          </Link>
        </li>
        <li className="p-4">
          <span className="font-bold">신고 내용 : </span>
          {item.content}
        </li>
      </ul>
    </>
  );
}
