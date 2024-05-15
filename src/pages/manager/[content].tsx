import { AiFillAlert } from '@react-icons/all-files/ai/AiFillAlert';
import { AiOutlineDashboard } from '@react-icons/all-files/ai/AiOutlineDashboard';
import { AiOutlineTeam } from '@react-icons/all-files/ai/AiOutlineTeam';
import { FaList } from '@react-icons/all-files/fa/FaList';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SearchBar from '@/components/manager/SearchBar';
import TotalChart from '@/components/TotalChart';

const DashBoardManagement = dynamic(
  () => import('@/components/manager/DashBoardManagement'),
  { ssr: false }
);

const ContentManagement = dynamic(
  () => import('@/components/manager/ContentManagement'),
  { ssr: false }
);

const ReportManagement = dynamic(
  () => import('@/components/manager/ReportManagement'),
  { ssr: false }
);

const UserManagement = dynamic(
  () => import('@/components/manager/UserManagement'),
  { ssr: false }
);

const MENU = [
  {
    bigContent: '대시보드',
    link: 'dashboard',
    icon: AiOutlineDashboard({}),
    contents: [{ content: '대시보드', link: 'dashboard' }],
  },
  {
    bigContent: '컨텐츠 관리',
    link: 'content',
    icon: FaList({}),
    contents: [
      { content: '프로젝트', link: 'project' },
      { content: '모임', link: 'recruit' },
      { content: '커뮤니티', link: 'community' },
    ],
  },
  {
    bigContent: '사용자',
    link: 'user',
    icon: AiOutlineTeam({}),
    contents: [
      { content: '사용자 관리', link: 'member' },
      // { content: '로그인 이력 관리', link: 'login' },
    ],
  },
  {
    bigContent: '신고',
    link: 'report',
    icon: AiFillAlert({}),
    contents: [{ content: '신고', link: 'report' }],
  },
];

const LOCALMEMODATA = 'admin-memo';

export default function Manager() {
  const [isSlide, setIsSlide] = useState(false);
  const [localMemo, setLocalMemo] = useState<{ id: string; text: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { content, type } = router.query;

  useEffect(() => {
    setIsSlide(false);
  }, [content, type]);

  useEffect(() => {
    const getMemo = localStorage.getItem(LOCALMEMODATA);
    if (getMemo) {
      setLocalMemo(JSON.parse(getMemo));
    }
    setIsLoading(false);
  }, []);

  const handleNowContentCSS = (url: string) => {
    if (url === type) {
      return 'bg-blue20';
    }
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <main className="h-[calc(100vh_-_4rem)] overflow-hidden">
      <div className="max-w-max_w min-h-min_h m-auto flex border-r border-gray10 relative">
        <button
          className={`hidden absolute top-10  ${isSlide ? 'left-60' : 'left-0'} p-2 rounded-r-md bg-blue20 z-10 cursor-pointer  transition-all mobile:block`}
          onClick={() => {
            setIsSlide(!isSlide);
          }}>
          <FaList size={20} />
        </button>

        <aside
          className={`w-60 h-screen border-x border-gray10 bg-blue10 z-10 transition-all mobile:absolute mobile:top-0 ${isSlide ? 'mobile:left-0' : 'mobile:-left-[100%]'}`}>
          <p className="relative w-fill h-fit p-5 text-center flex justify-center items-center border-b border-gary10">
            <Image
              src="/BS_Logo315x114.png"
              alt="로고 이미지"
              width={315}
              height={114}
              className="w-full h-full"
            />
          </p>

          <ul>
            {MENU.map((item1, index) => (
              <div
                key={`${item1}-${index}`}
                className="border-b border-gray10 font-bold">
                <li className="px-5 py-3 flex items-center gap-2">
                  <p className="text-bs_20">{item1.icon}</p>
                  {item1.bigContent}
                </li>
                {item1.contents?.map((item2) => {
                  if (item2) {
                    return (
                      <li
                        key={`${item2.link}-${index}`}
                        className={`${handleNowContentCSS(item2.link)} px-5 py-3 pl-10`}>
                        <Link href={`${item1.link}/?type=${item2.link}`}>
                          {item2.content}
                        </Link>
                      </li>
                    );
                  }
                })}
              </div>
            ))}
          </ul>
        </aside>

        <div className="w-full h-[calc(100vh_-_4rem)] overflow-auto">
          <div className={`w-full bg-blue10 p-3 flex justify-end`}>
            <button
              className="px-3 font-bold transition-all"
              onClick={handleGoHome}>
              나가기
            </button>
          </div>
          <div className="flex mobile:flex-col">
            <section className="w-3/5 h-[30rem] p-3 mobile:w-full ">
              <div className="bg-blue10 w-full h-full p-3">
                <TotalChart category={type as string} />
              </div>
            </section>
            <section className="w-2/5 h-[30rem] p-3 mobile:w-full">
              <div className="bg-blue10 w-full h-full p-3">
                <h3 className="text-bs_20 font-bold mb-2">메모장</h3>
                <ul>
                  {localMemo.map((item, index) => (
                    <li className="w-full py-3 overflow-auto" key={index}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
          {content !== 'dashboard' && <SearchBar />}
          {content === 'dashboard' && (
            <DashBoardManagement
              localMemo={localMemo}
              setLocalMemo={setLocalMemo}
              isLoading={isLoading}
            />
          )}
          {content === 'content' && <ContentManagement />}
          {content === 'user' && <UserManagement />}
          {content === 'report' && <ReportManagement />}
        </div>
      </div>
    </main>
  );
}
