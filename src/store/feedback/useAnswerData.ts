import { create } from 'zustand';

import { IAnswerType } from '@/types/global';

interface IAnswerBody {
  answer: IAnswerType[];
  setAnswer: (answer: IAnswerType[]) => void;
}

const useAnswerData = create<IAnswerBody>((set) => ({
  answer: [],
  setAnswer: (answer: IAnswerType[]) => set(() => ({ answer })),
}));

export default useAnswerData;
