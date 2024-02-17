import { create } from 'zustand';

interface ISearchErrorModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchErrorModal = create<ISearchErrorModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchErrorModal;
