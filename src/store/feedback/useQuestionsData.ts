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
  init: () => void;
}

const useQuestionsData = create<IQuestionsBody>((set) => ({
  questions: [
    { question: '', questionType: 'SUBJECTIVE', choiceItems: [''] },
    { question: '', questionType: 'OBJECTIVE', choiceItems: [''] },
    { question: '', questionType: 'CHECKBOX', choiceItems: [''] },
  ],
  setQuestions: (questions: IQuestionType[]) => set(() => ({ questions })),
  init: () =>
    set(() => ({
      questions: [
        { question: '', questionType: 'SUBJECTIVE', choiceItems: [''] },
        { question: '', questionType: 'OBJECTIVE', choiceItems: [''] },
        { question: '', questionType: 'CHECKBOX', choiceItems: [''] },
      ],
    })),
}));

export default useQuestionsData;
