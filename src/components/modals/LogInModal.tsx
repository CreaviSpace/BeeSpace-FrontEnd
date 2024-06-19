import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import Image from 'next/image';
import Link from 'next/link';

import useLoginModal from '@/store/modal/useLoginModal';

import Modals from './Modals';

const ICONS = [
  {
    title: '구글',
    icon: <FcGoogle key="google" size={45} />,
    style: 'bg-white',
    link: `${process.env.BASE_URL}/oauth2/authorization/google`,
  },
  {
    title: '카카오',
    icon: <RiKakaoTalkFill key="kakao" size={45} />,
    style: 'bg-yellow-300',
    link: `${process.env.BASE_URL}/oauth2/authorization/kakao`,
  },
  {
    title: '깃허브',
    icon: <IoLogoGithub key="github" size={45} />,
    style: 'bg-white',
    link: `${process.env.BASE_URL}/oauth2/authorization/github`,
  },
  {
    title: '네이버',
    icon: (
      <Image
        src="/img/icon/SiNaver.svg"
        alt="네이버 아이콘"
        width={35}
        height={35}
        className="object-center"
      />
    ),
    style: 'bg-green-500 p-3 flex',
    link: `${process.env.BASE_URL}/oauth2/authorization/naver`,
  },
];

export default function LogInModal() {
  const { isOpen, onClose } = useLoginModal();

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalCloseButton />
      <ModalHeader className="text-center mt-10 mb-2">로그인</ModalHeader>
      <ModalBody>
        <section className="mb-11 m-auto flex justify-between gap-10 mobile:flex-col">
          {ICONS.map((icon, index) => (
            <Link
              key={`icon-${index}`}
              href={icon.link}
              className="relative flex flex-col items-center gap-2 mobile:flex-row mobile:w-full">
              <div
                className={`${icon.style} rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2 mobile:rounded-sm mobile:w-full mobile:flex mobile:justify-center`}>
                {icon.icon}
              </div>
              <span className="mobile:hidden">{icon.title}</span>
            </Link>
          ))}
        </section>
      </ModalBody>
    </Modals>
  );
}
