import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Logo from '@/../public/BS_Logo500x181.png';

import CustomButton from '../button/CustomButton';

interface MenuItem {
  name: string;
  link: string;
}

export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const menu: Array<MenuItem> = [
    { name: '프로젝트', link: '/project?type=all' },
    { name: '모집', link: '/recruitment?type=all' },
    { name: '커뮤니티', link: '/community?type=all' },
  ];

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="sticky top-0 w-full h-16 z-20 bg-white">
      <nav className="border-b border-gray10">
        <div className="flex justify-between max-w-max_w content-center m-auto items-center">
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
          <ul className="flex items-center">
            <li
              className="p-5 text-center block cursor-pointer"
              aria-label="검색 버튼"
              onClick={handleSearchToggle}>
              <AiOutlineSearch size={22} />
            </li>
            <li>
              <CustomButton className="py-2 px-4 mr-3" color="primary">
                로그인
              </CustomButton>
            </li>
            <li>
              <CustomButton className="py-2 px-3">회원가입</CustomButton>
            </li>
          </ul>
        </div>
      </nav>
      {isSearchVisible && (
        <div className="h-screen fixed w-full z-10">
          <div className="h-20 shadow-md py-4 bg-white">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="max_w h-full m-auto relative max-w-max_w">
              <input
                type="search"
                name="searchValue"
                id="searchValue"
                placeholder="검색어를 입력하세요"
                className="w-full h-full bg-[#F5F5F5] rounded-bs_5 absolute p-5 "
              />
              <button
                type="submit"
                className="p-5 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2">
                <AiOutlineSearch size={30} />
              </button>
            </form>
          </div>
          <div
            className=" h-full bg-black/50 w-full cursor-pointer"
            onClick={handleSearchToggle}></div>
        </div>
      )}
    </header>
  );
}
