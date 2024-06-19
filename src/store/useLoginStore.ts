import { create } from 'zustand';

interface IuseLoginProps {
  login: boolean;
  setLogin: (token?: string) => void;
  setLogout: () => void;
}

const useLoginStore = create<IuseLoginProps>((set) => ({
  login: false,
  setLogin: (token?: string) => {
    if (token) {
      set(() => ({ login: true }));
    }
  },
  setLogout: () => set(() => ({ login: false })),
}));

export default useLoginStore;
