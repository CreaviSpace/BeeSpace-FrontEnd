import { create } from 'zustand';

interface IReportModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportModal = create<IReportModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReportModal;
