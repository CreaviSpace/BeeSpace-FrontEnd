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
  techStacks: { techStackId: number }[];
  // techStacks: { techStackId: number; techStack: string; iconUrl: string }[];
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
    setTechStacks: (techStacks: { techStackId: number }[]) => void;
    // setTechStacks: (techStacks: { techStackId: number; techStack: string; iconUrl: string }[]) => void;
  };
}

const useRecruitData = create<IRecruitBody>((set) => ({
  category: 'project',
  contact: '',
  contactWay: '',
  amount: 0,
  proceedWay: 'on',
  workDay: 0,
  end: '',
  title: '',
  content: '',
  positions: [{ position: '', amount: 0, now: 0 }],
  techStacks: [{ techStackId: 0 }],
  // techStacks: [{ techStackId: 0, techStack: '', iconUrl: '' }],
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
    ) => set(() => ({ positions })),
    setTechStacks: (techStacks: { techStackId: number }[]) =>
      set(() => ({ techStacks })),
    // setTechStacks: (techStacks: { techStackId: number; techStack: string; iconUrl: string }[]) =>
    //   set(() => ({ techStacks })),
  },
}));
export default useRecruitData;
