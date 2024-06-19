import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import LogInUserHeader from '@/components/layout/LogInUserHeader';
import useSearchErrorModal from '@/store/modal/useSearchErrorModal';
import useLoginStore from '@/store/useLoginStore';

import MoblieNavigation from './MoblieNavigation';

const MENU = [
  { name: '프로젝트', title: 'project', link: '/project?type=all' },
  { name: '모집', title: 'recruitment', link: '/recruitment?type=all' },
  { name: '커뮤니티', title: 'community', link: '/community?type=all' },
];

export default function Header() {
  const [value, setValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMCategoryVisible, setIsMCategoryVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('프로젝트');

  const divRef_search = useRef<HTMLDivElement>(null);
  const divRef_menu = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = router.pathname.split('/')[1];

  const { setLogin } = useLoginStore();
  const { onOpen: openSearchError } = useSearchErrorModal();

  const handleSearchToggle = () => {
    if (isSearchVisible) {
      divRef_search.current?.blur();
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    setIsSearchVisible(!isSearchVisible);
  };

  const handleMenuToggle = () => {
    if (isMCategoryVisible) {
      divRef_menu.current?.blur();
    } else {
      divRef_menu.current?.focus();
    }
    setIsMCategoryVisible(!isMCategoryVisible);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    if (value.trim().length >= 1) {
      router.push(`/search?type=all&text=${value}`);
      setIsSearchVisible(false);
    } else {
      openSearchError();
    }
    setValue('');
  };

  useEffect(() => {
    setLogin();
  }, []);

  return (
    <header className="sticky top-0 w-full h-16 z-20 bg-white">
      <nav className="border-b border-gray10 px-3">
        <div className="flex justify-between max-w-max_w content-center m-auto items-center">
          <h1>
            <Link href="/">
              <Image
                src="/BS_Logo500x181.png"
                alt="비스페이스 로고"
                width={500}
                height={200}
                className="w-32 h-auto"
              />
            </Link>
          </h1>

          <div className="flex items-center min_mobile:gap-2">
            <button
              className="hidden mobile:block"
              onClick={handleMenuToggle}
              onMouseDown={(e) => e.preventDefault()}>
              <AiOutlineUnorderedList size={25} />
            </button>
            <ul className="flex mobile:hidden">
              {MENU.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={`px-5 py-5 text-center block ${pathname === item.title && 'text-primary'}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              ref={divRef_menu}
              tabIndex={0}
              onFocus={() => setIsMCategoryVisible(true)}
              onBlur={() => setIsMCategoryVisible(false)}
              onMouseDown={(e) => e.preventDefault()}>
              {isMCategoryVisible && (
                <MoblieNavigation
                  menu={MENU}
                  setIsMCategoryVisible={setIsMCategoryVisible}
                />
              )}
            </div>
            <div
              className="p-5 text-center block cursor-pointer min_mobile:p-0"
              aria-label="검색 버튼"
              onClick={handleSearchToggle}>
              <AiOutlineSearch size={22} />
            </div>

            <LogInUserHeader />
          </div>
        </div>
      </nav>

      <div
        ref={divRef_search}
        tabIndex={0}
        onBlur={() => {
          // 비동기적으로 상태변경으로 순서에 맞게 동작
          setTimeout(() => {
            if (
              inputRef.current !== document.activeElement &&
              isSearchVisible
            ) {
              setIsSearchVisible(false);
            }
          }, 100);
        }}>
        {isSearchVisible && (
          <div className="h-screen fixed w-full z-10">
            <div className="h-20 shadow-md py-4 bg-white px-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="max_w h-full m-auto relative max-w-max_w">
                <label htmlFor="searchValue" className="sr-only">
                  검색창
                </label>
                <input
                  ref={inputRef}
                  type="search"
                  value={value}
                  name="searchValue"
                  id="searchValue"
                  placeholder="검색어를 입력하세요"
                  className="w-full h-full bg-[#F5F5F5] rounded-bs_5 absolute p-5 focus:outline-none"
                  tabIndex={0}
                  onFocus={() => setIsSearchVisible(true)}
                  onChange={handleValueChange}
                />
                <button
                  type="submit"
                  className="p-5 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
                  onMouseDown={(e) => e.preventDefault()}>
                  <AiOutlineSearch size={30} />
                </button>
              </form>
            </div>
            <div
              className="h-full bg-black/50 w-full cursor-pointer"
              onClick={handleSearchToggle}></div>
          </div>
        )}
      </div>
    </header>
  );
}
