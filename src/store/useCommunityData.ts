import { create } from 'zustand';

interface ICommunityBody {
  category: string;
  title: string;
  content: string;
  hashTags: string[];
  setter: {
    setCategory: (category: string) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setHashTags: (hashTags: string[]) => void;
  };
}

const useCommunityData = create<ICommunityBody>((set) => ({
  category: '',
  title: '',
  content: '',
  hashTags: [],
  setter: {
    setCategory: (category: string) => set(() => ({ category: category })),
    setTitle: (title: string) => set(() => ({ title: title })),
    setContent: (content: string) => set(() => ({ content: content })),
    setHashTags: (hashTags: string[]) => set(() => ({ hashTags: hashTags })),
  },
}));

export default useCommunityData;
