import { create } from 'zustand';

interface IUserStanctionModalProps {
  isOpen: boolean;
  id: string;
  onOpen: () => void;
  onClose: () => void;
  setId: (id: string) => void;
}

const useUserStanctionModal = create<IUserStanctionModalProps>((set) => ({
  isOpen: false,
  id: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (id: string) => set({ id }),
}));

export default useUserStanctionModal;
