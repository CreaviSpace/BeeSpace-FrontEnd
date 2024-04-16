import { IAnswerType, IQuestionAnswerType } from '@/types/global';

import AnswerTitle from '../AnswerTitle';

interface ICheckBoxAnswerProps {
  question: IQuestionAnswerType;
  answer: IAnswerType[];
  setAnswer: (answer: IAnswerType[]) => void;
  currentIndex: number;
}

export default function MultipleChoiceAnswer({
  question,
  answer,
  setAnswer,
  currentIndex,
}: ICheckBoxAnswerProps) {
  const handleChangeCheck = (id: number) => {
    const newAnswer = [...answer];
    newAnswer[currentIndex].selectedItems = [{ id: id }];
    setAnswer(newAnswer);
  };

  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <AnswerTitle question={question.question} />

      <label htmlFor="MultipleChoiceQuestionInput" className="sr-only">
        대답
      </label>
      <ul>
        {question.choiceItems?.map((item, index) => (
          <li key={index} className="flex items-center gap-2 h-fit mt-3">
            <input
              type="radio"
              id={question.question}
              name={question.question}
              onChange={() => handleChangeCheck(item.id)}
              checked={
                answer[currentIndex]?.selectedItems[0].id === item.id
              }></input>
            <p className="w-full border-b border-gray20 p-2">{item.item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
