import { create } from 'zustand';

import { IQuestionType } from '@/types/global';

interface IQuestionsBody {
  questions: IQuestionType[];
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
  setQuestions: (questions: IQuestionType[]) => set(() => ({ questions })),
}));

export default useQuestionsData;
