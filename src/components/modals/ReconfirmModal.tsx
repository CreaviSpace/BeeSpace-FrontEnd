import { Button, ModalFooter, ModalHeader } from '@chakra-ui/react';

import useReconfirmModal from '@/hooks/useReconfirmModal';

import Modals from './Modals';

interface IReconfirmModalProps {
  value: string;
}

export default function ReconfirmModal({ value }: IReconfirmModalProps) {
  const { isOpen, onOpen, onClose } = useReconfirmModal();

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">
        {value}을 삭제하시겠습니까?
      </ModalHeader>
      <ModalFooter className="gap-2">
        <Button
          colorScheme="gary"
          color="black"
          onClick={onClose}
          className="w-full bg-gray-100 text-bs_20 ">
          취소
        </Button>
        <Button
          colorScheme="secondary"
          color="black"
          onClick={onClose}
          className="w-full bg-blue20 text-bs_20 ">
          확인
        </Button>
      </ModalFooter>
    </Modals>
  );
}
