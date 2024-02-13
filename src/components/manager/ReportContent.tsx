import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaChevronUp } from '@react-icons/all-files/fa/FaChevronUp';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function ReportContent() {
  const tdRef = useRef<HTMLTableDataCellElement>(null);
  const [isArrow, setIsArrow] = useState(true);

  const trashContent = {
    Id: 1,
    Date: '2024.01.01',
    title: '집단간 싸움 유발',
    you: 'author',
    my: 'author',
    link: '/',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis convallis ligula ac hendrerit. Donec non accumsan orci. Sed mattis neque sit amet vulputate suscipit. Praesent volutpat iaculis orci. Sed accumsan nibh sit amet feugiat placerat.`,
  };

  const handleMelodeon = () => {
    if (tdRef.current) {
      if (tdRef.current.style.display === 'table-cell') {
        tdRef.current.style.display = 'none';
        setIsArrow(true);
      } else {
        tdRef.current.style.display = 'table-cell';
        setIsArrow(false);
      }
    }
  };

  return (
    <>
      <tr className="bg-white">
        <td className="p-4">{trashContent.Id}</td>
        <td className="p-4">{trashContent.Date}</td>
        <td className="p-4">{trashContent.title}</td>
        <td className="p-4">{trashContent.you}</td>
        <td className="p-4">{trashContent.my}</td>
        <td className="p-4">
          <Link href={trashContent.link}>게시판 이동</Link>
        </td>
        <td className="p-4">
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
        </td>
      </tr>
      <tr className="border-b border-black bg-white">
        <td colSpan={7} className="p-4 hidden" ref={tdRef}>
          {trashContent.content}
        </td>
      </tr>
    </>
  );
}
