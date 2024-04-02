import { IQuestionType } from '@/types/global';

import DeleteButton from '../DeleteButton';
interface IQuestionProps {
  questions: IQuestionType[];
  currentIndex: number;
  handelChangeQuestion: (index: number, value: string) => void;
  handelQuestionDelete: (currentIndex: number, id?: number) => void;
}
export default function ShortAnswerQuestion({
  questions,
  currentIndex,
  handelChangeQuestion,
  handelQuestionDelete,
}: IQuestionProps) {
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="ShortAnswerQuestionInput" className="sr-only">
        질문
      </label>
      <input
        type="text"
        name="ShortAnswerQuestionInput"
        id="ShortAnswerQuestionInput"
        placeholder="질문을 입력해주세요."
        value={questions[currentIndex].question}
        onChange={(e) => {
          handelChangeQuestion(currentIndex, e.target.value);
        }}
        disabled={questions[currentIndex].questionId ? true : false}
        className="w-full border border-gray20 p-2 rounded-bs_5 bg-[#f7f7f7]"
      />
      <DeleteButton
        handleDelete={() =>
          handelQuestionDelete(
            currentIndex,
            questions[currentIndex]?.questionId
          )
        }
      />
    </div>
  );
}
