import { Button, ModalFooter, ModalHeader } from '@chakra-ui/react';

import useSearchErrorModal from '@/store/useSearchErrorModal';

import Modals from './Modals';

export default function SearchErrorModal() {
  const { isOpen, onOpen, onClose } = useSearchErrorModal();
  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">
        검색어를 한 글자 이상 입력해주세요.
      </ModalHeader>

      <ModalFooter>
        <Button
          colorScheme="primary"
          color="black"
          onClick={onClose}
          className="w-full bg-primary text-bs_20 ">
          확인
        </Button>
      </ModalFooter>
    </Modals>
  );
}
