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

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalCloseButton />
      <ModalHeader className="text-center mt-10 mb-2">로그인</ModalHeader>
      <ModalBody>
        <section className="mb-11 m-auto w-fit flex justify-between gap-3">
          <Link
            href="/"
            className="bg-white rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2">
            <FcGoogle size={45} />
          </Link>
          <Link
            href="/"
            className="bg-yellow-300 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2">
            <RiKakaoTalkFill size={45} />
          </Link>
          <Link
            href="/"
            className="bg-white rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-2">
            <IoLogoGithub size={45} />
          </Link>

          <Link
            href="/"
            className="bg-green-500 rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.3)] p-3 flex">
            <Image
              src="/img/icon/SiNaver.svg"
              alt="네이버 아이콘"
              width={35}
              height={35}
              className="object-center"
            />
          </Link>
        </section>
      </ModalBody>
    </Modals>
  );
}
