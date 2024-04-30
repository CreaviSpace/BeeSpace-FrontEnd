import { create } from 'zustand';

interface IRecruitBody {
  category: string;
  amount: number;
  workDay: number;
  contact: string;
  contactWay: string;
  proceedWay: string;
  end: string;
  title: string;
  content: string;
  positions: { position: string; amount: number; now: number }[];
  techStacks: { techStack: string; iconUrl?: string }[];
  setter: {
    setCategory: (category: string) => void;
    setContactWay: (contactWay: string) => void;
    setContact: (contact: string) => void;
    setAmount: (amount: number) => void;
    setProceedWay: (proceedWay: string) => void;
    setWorkDay: (workDay: number) => void;
    setEnd: (end: string) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setPositions: (
      positions: {
        position: string;
        amount: number;
        now: number;
      }[]
    ) => void;
    setTechStacks: (
      techStacks: { techStack: string; iconUrl?: string }[]
    ) => void;
  };
}

const useRecruitData = create<IRecruitBody>((set) => ({
  category: '',
  contact: '',
  contactWay: '',
  amount: 0,
  proceedWay: '',
  workDay: 0,
  end: '',
  title: '',
  content: '',
  positions: [],
  techStacks: [{ techStack: '', iconUrl: '' }],
  setter: {
    setCategory: (category: string) => set({ category }),
    setAmount: (amount: number) => set({ amount }),
    setWorkDay: (workDay: number) => set({ workDay }),
    setContact: (contact: string) => set({ contact }),
    setContactWay: (contactWay: string) => set({ contactWay }),
    setProceedWay: (proceedWay: string) => set({ proceedWay }),
    setEnd: (end: string) => set({ end: end }),
    setTitle: (title: string) => set({ title }),
    setContent: (content: string) => set({ content }),
    setPositions: (
      positions: {
        position: string;
        amount: number;
        now: number;
      }[]
    ) => set(() => ({ positions: positions })),
    setTechStacks: (techStacks: { techStack: string; iconUrl?: string }[]) =>
      set(() => ({ techStacks: techStacks })),
  },
}));
export default useRecruitData;
