import { create } from 'zustand';

interface ISignUpModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignUpModal = create<ISignUpModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignUpModal;
