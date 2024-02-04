import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import { IoLogoGithub } from '@react-icons/all-files/io/IoLogoGithub';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import Image from 'next/image';
import Link from 'next/link';

import useSignUpModal from '@/hooks/useSignUpModal';

import Modals from './Modals';

export default function SignUpModal() {
  const { isOpen, onOpen, onClose } = useSignUpModal();
  const icons = [
    { icon: <FcGoogle key="google" size={45} />, style: 'bg-white', link: '/' },
    {
      icon: <RiKakaoTalkFill key="kakao" size={45} />,
      style: 'bg-yellow-300',
      link: '/',
    },
    {
      icon: <IoLogoGithub key="github" size={45} />,
      style: 'bg-white',
      link: '/',
    },
    {
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
      <ModalHeader className="text-center mt-10 mb-2">회원가입</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <section className="mb-11 m-auto w-fit flex justify-between gap-3">
          {icons.map((icon, index) => (
            <Link
              key={`icon-${index}`}
              href={icon.link}
              className={`${icon.style} rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2`}>
              {icon.icon}
            </Link>
          ))}
        </section>
      </ModalBody>
    </Modals>
  );
}
