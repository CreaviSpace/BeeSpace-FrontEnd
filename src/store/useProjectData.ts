import { create } from 'zustand';

interface IProjectBody {
  category: string;
  title: string;
  content: string;
  field: string;
  thumbnail: string;
  bannerContent: string;
  memberDtos: { memberId: string; position: string }[];
  techStackDtos: { techStack: string; iconUrl?: string }[];
  linkDtos: { linkType: string; url: string }[];
  images: string[];
  setter: {
    setCategory: (category: string) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setfield: (field: string) => void;
    setTechStackDtos: (
      techStackDtos: { techStack: string; iconUrl?: string }[]
    ) => void;
    setMemberDtos: (
      memberDtos: { memberId: string; position: string }[]
    ) => void;
    setLinkDtos: (linkDtos: { linkType: string; url: string }[]) => void;
    setThumbnail: (thumbnail: string) => void;
    setBannerContent: (bannerContent: string) => void;
    setImages: (image: string) => void;
  };
}

const useProjectData = create<IProjectBody>((set) => ({
  category: '',
  title: '',
  content: '',
  field: '',
  thumbnail: '',
  bannerContent: '',
  memberDtos: [{ memberId: '', position: '' }],
  techStackDtos: [],
  linkDtos: [
    { linkType: 'web', url: '' },
    { linkType: 'android', url: '' },
    { linkType: 'ios', url: '' },
  ],
  images: [],
  setter: {
    setCategory: (category: string) => set(() => ({ category: category })),
    setTitle: (title: string) => set(() => ({ title: title })),
    setContent: (content: string) => set(() => ({ content: content })),
    setfield: (field: string) => set(() => ({ field: field })),
    setMemberDtos: (memberDtos: { memberId: string; position: string }[]) =>
      set(() => ({ memberDtos: memberDtos })),
    setTechStackDtos: (
      techStackDtos: { techStack: string; iconUrl?: string }[]
    ) => set(() => ({ techStackDtos: techStackDtos })),
    setLinkDtos: (linkDtos: { linkType: string; url: string }[]) =>
      set(() => ({ linkDtos: linkDtos })),
    setThumbnail: (thumbnail: string) => set(() => ({ thumbnail: thumbnail })),
    setBannerContent: (bannerContent: string) =>
      set(() => ({ bannerContent: bannerContent })),
    setImages: (image: string) => {
      set((state) => {
        const imagesSet = new Set(state.images);
        imagesSet.add(image);

        return { images: Array.from(imagesSet) };
      });
    },
  },
}));

export default useProjectData;
