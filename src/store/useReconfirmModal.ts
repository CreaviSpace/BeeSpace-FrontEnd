import { create } from 'zustand';

interface IReconfirmModalProps {
  isOpen: boolean;
  id: number;
  postType: string;
  onOpen: () => void;
  onClose: () => void;
  setPostType: (postType: string) => void;
  setId: (id: number) => void;
}

const useReconfirmModal = create<IReconfirmModalProps>((set) => ({
  isOpen: false,
  postType: '',
  id: 0,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setPostType: (postType: string) => set({ postType }),
  setId: (id: number) => set({ id }),
}));

export default useReconfirmModal;
