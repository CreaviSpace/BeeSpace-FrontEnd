import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Logo from '@/../public/BS_Logo315x114.png';

interface MenuItem {
  name: string;
  link: string;
}

export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const menu: Array<MenuItem> = [
    { name: '프로젝트', link: '/project' },
    { name: '모집', link: '/recruitment' },
    { name: '커뮤니티', link: '/community' },
  ];

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header>
      <nav className="border-b border-gray10">
        <div className="flex justify-between w-max_w content-center m-auto items-center">
          <h1>
            <Link href="/">
              <Image src={Logo} alt="비스페이스 로고" className="w-32 h-auto" />
            </Link>
          </h1>
          <ul className="flex">
            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="p-5 text-center block hover:text-primary">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex">
            <li
              className="p-5 text-center block cursor-pointer"
              aria-label="검색 버튼"
              onClick={handleSearchToggle}>
              <AiOutlineSearch size={22} />
            </li>
            <li className="p-5 text-center block">로그인</li>
            <li className="p-5 text-center block">회원가입</li>
          </ul>
        </div>
      </nav>
      {isSearchVisible && (
        <div className="h-20 bg-white shadow-md py-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-max_w h-full m-auto relative">
            <input
              type="search"
              name="searchValue"
              id="searchValue"
              placeholder="검색어를 입력하세요"
              className="w-full h-full bg-[#F5F5F5] rounded-md absolute p-5"
            />
            <button
              type="submit"
              className="p-5 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2">
              <AiOutlineSearch size={30} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
