import { create } from 'zustand';

interface ICommunityBody {
  category: string;
  title: string;
  content: string;
  hashTags: string[];
  images: string[];
  setter: {
    setCategory: (category: string) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setHashTags: (hashTags: string[]) => void;
    setImages: (image: string) => void;
  };
}

const useCommunityData = create<ICommunityBody>((set) => ({
  category: '',
  title: '',
  content: '',
  hashTags: [],
  images: [],
  setter: {
    setCategory: (category: string) => set(() => ({ category: category })),
    setTitle: (title: string) => set(() => ({ title: title })),
    setContent: (content: string) => set(() => ({ content: content })),
    setHashTags: (hashTags: string[]) => set(() => ({ hashTags: hashTags })),
    setImages: (image: string) => {
      set((state) => {
        const imagesSet = new Set(state.images);
        imagesSet.add(image);

        return { images: Array.from(imagesSet) };
      });
    },
  },
}));

export default useCommunityData;
