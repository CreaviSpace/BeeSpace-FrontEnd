import { create } from 'zustand';

import { IquestionType } from '@/types/global';

interface IQuestionsBody {
  questions: IquestionType[];
  setQuestions: (
    questions: {
      question: string;
      questionType: string;
      choiceItems: string[];
    }[]
  ) => void;
}

const useQuestionsData = create<IQuestionsBody>((set) => ({
  questions: [
    { question: '', questionType: '주관식', choiceItems: [''] },
    { question: '', questionType: '객관식', choiceItems: [''] },
    { question: '', questionType: '체크박스', choiceItems: [''] },
  ],
  setQuestions: (questions: IquestionType[]) => set(() => ({ questions })),
}));

export default useQuestionsData;
