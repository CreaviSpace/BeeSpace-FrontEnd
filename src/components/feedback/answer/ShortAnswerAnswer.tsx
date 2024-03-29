import { IQuestionAnswerType } from '@/types/global';

interface ICheckBoxAnswerProps {
  question: IQuestionAnswerType;
}

export default function ShortAnswerAnswer({ question }: ICheckBoxAnswerProps) {
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="ShortAnswerQuestionInput" className="sr-only">
        질문
      </label>
      <h2 className="w-full border-b border-gray20 p-2 bg-[#f7f7f7]">
        {question.question}
      </h2>

      <label htmlFor="ShortAnswerAnswerInput" className="sr-only">
        답변
      </label>
      <input
        type="text"
        name="ShortAnswerAnswerInput"
        id="ShortAnswerAnswerInput"
        placeholder="답변"
        className="w-full border-b border-gray20 p-1 mt-3 text-bs_14"
      />
    </div>
  );
}
