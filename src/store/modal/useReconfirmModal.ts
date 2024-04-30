import { create } from 'zustand';

interface IReconfirmModalProps {
  isOpen: boolean;
  title: string;
  setTitle: (title: string) => void;
  handlerFunction: () => void;
  onOpen: () => void;
  onClose: () => void;
  setHandlerFunction: (func: () => void) => void;
}

const useReconfirmModal = create<IReconfirmModalProps>((set) => ({
  isOpen: false,
  title: '',
  setTitle: (title: string) => set({ title }),
  handlerFunction: () => {},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setHandlerFunction: (func) => set({ handlerFunction: func }),
}));

export default useReconfirmModal;
