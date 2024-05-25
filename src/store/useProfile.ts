import { create } from 'zustand';

interface IProfileBody {
  enabled: boolean | null;
  nickName: string;
  introduce: string;
  position: string[];
  career: string[];
  interestedStack: {
    techStack: string;
  }[];
  profileUrl: string;
  setter: {
    setEnabled: (enabled: boolean | null) => void;
    setNickName: (nickName: string) => void;
    setIntroduce: (introduce: string) => void;
    setPosition: (position: string[]) => void;
    setCareer: (career: string[]) => void;
    setInterestedStack: (interestedStack: { techStack: string }[]) => void;
    setProfileUrl: (profileUrl: string) => void;
  };
}

const useProfileData = create<IProfileBody>((set) => ({
  enabled: null,
  nickName: '',
  introduce: '',
  position: [''],
  career: [''],
  interestedStack: [
    {
      techStack: '',
    },
  ],
  profileUrl: '',
  setter: {
    setEnabled: (enabled: boolean | null) => set(() => ({ enabled })),
    setNickName: (nickName: string) => set(() => ({ nickName: nickName })),
    setIntroduce: (introduce: string) => set(() => ({ introduce: introduce })),
    setPosition: (position: string[]) => set(() => ({ position: position })),
    setCareer: (career: string[]) => set(() => ({ career: career })),
    setInterestedStack: (interestedStack: { techStack: string }[]) =>
      set(() => ({ interestedStack: interestedStack })),
    setProfileUrl: (profileUrl: string) =>
      set(() => ({ profileUrl: profileUrl })),
  },
}));
export default useProfileData;
