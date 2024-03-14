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
  setter: {
    setCategory: (category: string) => void;
    setAmount: (amount: number) => void;
    setWorkDay: (workDay: number) => void;
    setContact: (contact: string) => void;
    setContactWay: (contactWay: string) => void;
    setProceedWay: (proceedWay: string) => void;
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
  };
}

const useRecruitData = create<IRecruitBody>((set) => ({
  category: '',
  amount: 0,
  workDay: 0,
  contact: '',
  contactWay: '',
  proceedWay: '',
  end: '',
  title: '',
  content: '',
  positions: [{ position: '', amount: 0, now: 0 }],
  techStacks: [{ techStackId: 0 }],
  setter: {
    setCategory: (category: string) => set({ category: category }),
    setAmount: (amount: number) => set({ amount: amount }),
    setWorkDay: (workDay: number) => set({ workDay: workDay }),
    setContact: (contact: string) => set({ contact: contact }),
    setContactWay: (contactWay: string) => set({ contactWay: contactWay }),
    setProceedWay: (proceedWay: string) => set({ proceedWay: proceedWay }),
    setEnd: (end: string) => set({ end: end }),
    setTitle: (title: string) => set({ title: title }),
    setContent: (content: string) => set({ content: content }),
    setPositions: (
      positions: {
        position: string;
        amount: number;
        now: number;
      }[]
    ) => set(() => ({ positions: positions })),
    setTechStacks: (techStacks: { techStackId: number }[]) =>
      set(() => ({ techStacks: techStacks })),
  },
}));
export default useRecruitData;
