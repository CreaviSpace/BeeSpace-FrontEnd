import { IAnswerType, IQuestionAnswerType } from '@/types/global';

import AnswerTitle from '../AnswerTitle';

interface ICheckBoxAnswerProps {
  question: IQuestionAnswerType;
  answer: IAnswerType[];
  setAnswer: (answer: IAnswerType[]) => void;
  currentIndex: number;
}

export default function CheckBoxAnswer({
  question,
  answer,
  setAnswer,
  currentIndex,
}: ICheckBoxAnswerProps) {
  const handleChangeCheck = (id: number) => {
    const newAnswer = [...answer];
    if (newAnswer[currentIndex].selectedItems.some((item) => item.id === id)) {
      const selectedItem = newAnswer[currentIndex].selectedItems.filter(
        (item) => item.id !== id
      );
      newAnswer[currentIndex].selectedItems = selectedItem;
      setAnswer(newAnswer);
    } else {
      if (newAnswer[currentIndex].selectedItems[0]?.id === 0) {
        const selectedItem = (newAnswer[currentIndex].selectedItems = [
          { id: id },
        ]);
        newAnswer[currentIndex].selectedItems = selectedItem;
      } else {
        const selectedItem = (newAnswer[currentIndex].selectedItems = [
          ...newAnswer[currentIndex].selectedItems,
          { id: id },
        ]);
        newAnswer[currentIndex].selectedItems = selectedItem;
      }
      setAnswer(newAnswer);
    }
  };

  const handleCheck = (index: number) => {
    let i = -1;
    answer[currentIndex]?.selectedItems.map((item) => {
      if (item.id === question.choiceItems[index].id) {
        i = index;
        return;
      }
    });

    return i;
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
              type="checkbox"
              id={question.question}
              name={question.question}
              onChange={() => handleChangeCheck(item.id)}
              checked={handleCheck(index) === index}></input>
            <p
              className="w-full border-b border-gray20 p-2"
              onClick={() => handleChangeCheck(item.id)}>
              {item.item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
