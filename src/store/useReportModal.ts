import { create } from 'zustand';

interface IReportModalProps {
  isOpen: boolean;
  reportTitle: string;
  onOpen: () => void;
  onClose: () => void;
  setReportTitle: (reportTitle: string) => void;
}

const useReportModal = create<IReportModalProps>((set) => ({
  isOpen: false,
  reportTitle: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setReportTitle: (reportTitle: string) => set(() => ({ reportTitle })),
}));

export default useReportModal;
