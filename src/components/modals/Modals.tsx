import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

interface IModalsProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modals({ isOpen, onClose, children }: IModalsProps) {
  const finalRef = useRef(null);

  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
