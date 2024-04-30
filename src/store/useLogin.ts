import { create } from 'zustand';

interface IuseLoginProps {
  login: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

const useLogin = create<IuseLoginProps>((set) => ({
  login: false,
  setLogin: () => set(() => ({ login: true })),
  setLogout: () => set(() => ({ login: false })),
}));

export default useLogin;
