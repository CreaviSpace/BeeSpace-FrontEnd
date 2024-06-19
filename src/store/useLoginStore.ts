import { create } from 'zustand';

import { getCookies } from '@/utils/cookie/getCookies';

interface IuseLoginProps {
  login: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

const useLoginStore = create<IuseLoginProps>((set) => ({
  login: false,
  setLogin: () => {
    const token = getCookies('jwt');
    if (token) {
      set(() => ({ login: true }));
    }
  },
  setLogout: () => set(() => ({ login: false })),
}));

export default useLoginStore;
