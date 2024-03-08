import { create } from 'zustand';

interface IProjectBody {
  category: string;
  title: string;
  content: string;
  field: string;
  thumbnail: string;
  bannerContent: string;
  memberDtos: { memberId: number; position: string }[];
  techStackDtos: { techStackId: number }[];
  linkDtos: { type: string; url: string }[];
  setter: {
    setCategory: (category: string) => void;
    setTtitle: (title: string) => void;
    setContent: (content: string) => void;
    setfield: (field: string) => void;
    setTechStackDtos: (techStackDtos: { techStackId: number }[]) => void;
    setMemberDtos: (
      memberDtos: { memberId: number; position: string }[]
    ) => void;
    setLinkDtos: (linkDtos: { type: string; url: string }[]) => void;
  };
}

const useProjectData = create<IProjectBody>((set) => ({
  category: '',
  title: '',
  content: '',
  field: '',
  thumbnail: '',
  bannerContent: '',
  memberDtos: [{ memberId: 0, position: '' }],
  techStackDtos: [{ techStackId: 0 }],
  linkDtos: [{ type: '', url: '' }],
  setter: {
    setCategory: (category: string) => set(() => ({ category: category })),
    setTtitle: (title: string) => set(() => ({ title: title })),
    setContent: (content: string) => set(() => ({ content: content })),
    setfield: (field: string) => set(() => ({ field: field })),
    setMemberDtos: (memberDtos: { memberId: number; position: string }[]) =>
      set(() => ({ memberDtos: memberDtos })),
    setTechStackDtos: (techStackDtos: { techStackId: number }[]) =>
      set(() => ({ techStackDtos: techStackDtos })),
    setLinkDtos: (linkDtos: { type: string; url: string }[]) =>
      set(() => ({ linkDtos: linkDtos })),
  },
}));

export default useProjectData;
