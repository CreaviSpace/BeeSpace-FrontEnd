import { Button, ModalFooter, ModalHeader } from '@chakra-ui/react';

import useReconfirmModal from '@/store/modal/useReconfirmModal';

import Modals from './Modals';

export default function ReconfirmModal() {
  const {
    isOpen,
    title,
    onClose,
    setTitle,
    handlerFunction,
    setHandlerFunction,
  } = useReconfirmModal();

  const handleReconfirmCancel = () => {
    setTitle('');
    setHandlerFunction(() => {});
    onClose();
  };

  const handleReconfirm = () => {
    handlerFunction();
    onClose();
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">{title}</ModalHeader>
      <ModalFooter className="gap-2">
        <Button
          colorScheme="gary"
          color="black"
          onClick={handleReconfirmCancel}
          className="w-full bg-gray-100 text-bs_20 ">
          취소
        </Button>
        <Button
          colorScheme="secondary"
          color="black"
          onClick={handleReconfirm}
          className="w-full bg-blue20 text-bs_20 ">
          확인
        </Button>
      </ModalFooter>
    </Modals>
  );
}
