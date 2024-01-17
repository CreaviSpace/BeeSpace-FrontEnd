import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    <footer className="relative w-full bg-[#EFEFEF] flex">
      <div className="w-1.5/6  border-r-2 border-[#BBBBBB] p-14">
        <div className="absolute left-0 top-10 w-full border border-[#BBBBBB]" />
        <Link href="/">
          <Image
            src={'/BS_Logo315x114.png'}
            alt="logo"
            width={186}
            height={70}
          />
        </Link>
        <ul className="text-bs_14 mt-5">
          {info.map((item, index) => (
            <li key={`info-${index}`} className="flex">
              <div className="w-16 ">{item.name}</div>
              |&nbsp;&nbsp;
              {item.detail}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-4/6 flex justify-center gap-10 p-14 text-bs_18">
        <ul>
          <li>바로가기</li>
          {menu.map((item, index) => (
            <li key={`menu-${index}`}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <ul>
          {service.map((item, index) => (
            <li key={`service-${index}`}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
