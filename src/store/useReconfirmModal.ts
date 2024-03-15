import { create } from 'zustand';

interface IReconfirmModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReconfirmModal = create<IReconfirmModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReconfirmModal;
