import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface IModalsProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modals({
  isOpen,
  onClose,
  children,
  className,
}: IModalsProps) {
  const finalRef = useRef(null);

  const [modalSize, setModalSize] = useState('md');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setModalSize('full');
      } else {
        setModalSize('md');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered>
      <ModalOverlay />
      <ModalContent className={`${className} min-w-min_w`}>
        {children}
      </ModalContent>
    </Modal>
  );
}
