import { IAnswerType, IQuestionAnswerType } from '@/types/global';

import AnswerTitle from '../AnswerTitle';

interface ICheckBoxAnswerProps {
  question: IQuestionAnswerType;
  answer: IAnswerType[];
  setAnswer: (answer: IAnswerType[]) => void;
  currentIndex: number;
}

export default function ShortAnswerAnswer({
  question,
  answer,
  setAnswer,
  currentIndex,
}: ICheckBoxAnswerProps) {
  const handelChangeValue = (value: string) => {
    const newAnswer = [...answer];
    newAnswer[currentIndex].answer = value;
    setAnswer(newAnswer);
  };

  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <AnswerTitle question={question.question} />

      <label htmlFor="ShortAnswerAnswerInput" className="sr-only">
        답변
      </label>
      <input
        type="text"
        name="ShortAnswerAnswerInput"
        id="ShortAnswerAnswerInput"
        value={answer[currentIndex]?.answer}
        onChange={(e) => handelChangeValue(e.target.value)}
        placeholder="답변"
        className="w-full border-b border-gray20 p-1 mt-3 text-bs_14"
      />
    </div>
  );
}
