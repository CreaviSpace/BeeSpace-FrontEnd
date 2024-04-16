import { Button, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useWriteDelete from '@/hooks/useWriteDelete';
import useReconfirmModal from '@/store/useReconfirmModal';

import Modals from './Modals';

export default function ReconfirmModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, id, postType, setId, setPostType } =
    useReconfirmModal();

  const { mutate } = useWriteDelete(id, postType);

  const handleReconfirmCancel = () => {
    setId(0);
    setPostType('');
    onClose();
  };

  const handleReconfirm = () => {
    mutate();
    onClose();
    router.push(`/${postType}?type=all`);
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">
        게시글을 삭제하시겠습니까?
      </ModalHeader>
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
