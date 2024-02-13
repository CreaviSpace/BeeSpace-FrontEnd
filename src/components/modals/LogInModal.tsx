import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import Image from 'next/image';
import Link from 'next/link';

import useLoginModal from '@/hooks/useLoginModal';

import Modals from './Modals';

export default function LogInModal() {
  const { isOpen, onOpen, onClose } = useLoginModal();

  const icons = [
    {
      title: '구글',
      icon: <FcGoogle key="google" size={45} />,
      style: 'bg-white',
      link: '/',
    },
    {
      title: '카카오',
      icon: <RiKakaoTalkFill key="kakao" size={45} />,
      style: 'bg-yellow-300',
      link: '/',
    },
    {
      title: '깃허브',
      icon: <IoLogoGithub key="github" size={45} />,
      style: 'bg-white',
      link: '/',
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
      link: '/',
    },
  ];
  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalCloseButton />
      <ModalHeader className="text-center mt-10 mb-2">로그인</ModalHeader>
      <ModalBody>
        <section className="mb-11 m-auto flex justify-between gap-10">
          {icons.map((icon, index) => (
            <Link
              key={`icon-${index}`}
              href={icon.link}
              className=" flex flex-col items-center gap-2">
              <div
                className={`${icon.style} rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2`}>
                {icon.icon}
              </div>
              <span>{icon.title}</span>
            </Link>
          ))}
        </section>
      </ModalBody>
    </Modals>
  );
}
