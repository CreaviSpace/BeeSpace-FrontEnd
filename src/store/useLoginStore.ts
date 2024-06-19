import { create } from 'zustand';

interface IuseLoginProps {
  login: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

const useLoginStore = create<IuseLoginProps>((set) => ({
  login: false,
  setLogin: () => set(() => ({ login: true })),
  setLogout: () => set(() => ({ login: false })),
}));

export default useLoginStore;
