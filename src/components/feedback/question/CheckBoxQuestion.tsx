import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';

import { IQuestionType } from '@/types/global';

import DeleteButton from '../DeleteButton';
interface IQuestionProps {
  questions: IQuestionType[];
  setQuestions: (questions: IQuestionType[]) => void;
  currentIndex: number;
  handelChangeQuestion: (index: number, value: string) => void;
  handelQuestionDelete: (currentIndex: number, id?: number) => void;
}
export default function CheckBoxQuestion({
  questions,
  setQuestions,
  currentIndex,
  handelChangeQuestion,
  handelQuestionDelete,
}: IQuestionProps) {
  const handleChoiceItemsPlus = () => {
    const newQuestions = [...questions];
    const newChoiceItems = [...questions[currentIndex].choiceItems];
    newChoiceItems.push('');
    newQuestions[currentIndex].choiceItems = newChoiceItems;
    setQuestions(newQuestions);
  };

  const handleChoiceItemsMinus = (index: number) => {
    const newQuestions = [...questions];
    const newChoiceItems = newQuestions[currentIndex].choiceItems.filter(
      (_, i) => i !== index
    );
    newQuestions[currentIndex].choiceItems = newChoiceItems;
    setQuestions(newQuestions);
  };

  const handleCnageChoiceItems = (index: number, value: string) => {
    const newQuestions = [...questions];
    const newChoiceItems = [...questions[currentIndex].choiceItems];
    newChoiceItems[index] = value;
    newQuestions[currentIndex].choiceItems = newChoiceItems;
    setQuestions(newQuestions);
  };

  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="CheckBoxQuestionInput" className="sr-only">
        질문
      </label>
      <input
        type="text"
        name="CheckBoxQuestionInput"
        id="CheckBoxQuestionInput"
        placeholder="질문을 입력해주세요."
        value={questions[currentIndex].question}
        onChange={(e) => {
          handelChangeQuestion(currentIndex, e.target.value);
        }}
        disabled={questions[currentIndex].questionId ? true : false}
        className="w-full border border-gray20 p-2 rounded-bs_5 bg-[#f7f7f7]"
      />

      <label htmlFor="MultipleChoiceQuestionInput" className="sr-only">
        대답
      </label>
      <ul>
        {questions[currentIndex].choiceItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2 h-fit mt-3">
            <label
              htmlFor="CheckBoxAnswerInput"
              className="border-2 rounded-bs_5 border-gray40 p-2 bg-white"></label>
            <input
              type="text"
              name="CheckBoxAnswerInput"
              id="CheckBoxAnswerInput"
              placeholder={`옵션${index}`}
              value={item}
              onChange={(e) => {
                handleCnageChoiceItems(index, e.target.value);
              }}
              disabled={questions[currentIndex].questionId ? true : false}
              className="w-full border-b border-gray20 p-2"
            />
            {index > 1 && !questions[currentIndex].questionId && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleChoiceItemsMinus(index);
                }}>
                <IoCloseOutline size={18} />
              </span>
            )}
          </li>
        ))}

        {questions[currentIndex].choiceItems.length < 5 &&
          !questions[currentIndex].questionId && (
            <li
              className="flex justify-center mt-3 cursor-pointer"
              onClick={handleChoiceItemsPlus}>
              <BsPlusCircle size={20} />
            </li>
          )}
      </ul>
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
