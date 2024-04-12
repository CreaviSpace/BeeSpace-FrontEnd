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
  className?: string;
  size?: string;
}

export default function Modals({
  isOpen,
  onClose,
  children,
  className,
  size,
}: IModalsProps) {
  const finalRef = useRef(null);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={size}>
      <ModalOverlay />
      <ModalContent className={`${className} min-w-min_w`}>
        {children}
      </ModalContent>
    </Modal>
  );
}
