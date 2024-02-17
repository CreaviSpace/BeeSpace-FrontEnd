import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@/../public/BS_Logo315x114.png';

export default function Footer() {
  const router = useRouter();
  const pathname = router.pathname.split('/')[1];

  // 채팅창 또는 관리자 페이지 Footer null
  if (pathname === 'messenger' || pathname === 'manager') {
    return null;
  }

  const info = [
    { name: 'contect', detail: 'google@gmail.com' },
    { name: 'copyright', detail: 'BeeSpace. All rights reserved' },
  ];
  const menu = [
    { name: '프로젝트', link: '/#' },
    { name: '모집', link: '/#' },
    { name: '커뮤니티', link: '/#' },
  ];
  const service = [
    { name: '서비스 소개', link: '/#' },
    { name: '이용약관', link: '/#' },
  ];

  return (
    <footer className="relative max_w flex justify-center bg-[#EFEFEF]">
      <div className="w-full max-w-max_w flex">
        <div className="w-2/6  border-r-2 border-[#BBBBBB] py-14 px-14 m-auto mobile:w-3/6 mobile:px-5">
          <div className="absolute left-0 top-10 w-full border-t-2 border-[#BBBBBB]" />
          <Link href="/" className="mobile:hidden">
            <Image src={Logo} alt="logo" width={186} height={70} />
          </Link>
          <ul className="text-bs_14 mt-5 mobile:mt-0">
            {info.map((item, index) => (
              <li
                key={`info-${index}`}
                className="flex tablet:flex-col mobile:flex-col">
                <div className="w-20 font-bold">{item.name}</div>
                <span className="tablet:hidden mobile:hidden">
                  |&nbsp;&nbsp;
                </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-4/6 flex justify-center gap-10 pt-14 text-bs_18 mobile:w-3/6 mobile:gap-2">
          <ul className="text-bs_14">
            <li className="p-2 mobile:p-1">바로가기</li>
            {menu.map((item, index) => (
              <li key={`menu-${index}`} className="p-2 mobile:p-1">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <ul className="text-bs_14">
            {service.map((item, index) => (
              <li key={`service-${index}`} className="p-2 mobile:p-1">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
