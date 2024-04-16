import { BsPlusCircle } from '@react-icons/all-files/bs/BsPlusCircle';

import { IQuestionType } from '@/types/global';

interface IQuestionBoxProps {
  questions: IQuestionType[];
  setQuestions: (questions: IQuestionType[]) => void;
}

export default function QuestionBox({
  questions,
  setQuestions,
}: IQuestionBoxProps) {
  const questionTypes = [
    {
      text: '객관식',
      onClick: function handleMultipleChoice() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'OBJECTIVE',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
    {
      text: '단답형',
      onClick: function handleShortAnswer() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'SUBJECTIVE',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
    {
      text: '체크박스',
      onClick: function handleCheckBox() {
        const newQuestions = [...questions];
        newQuestions.push({
          question: '',
          questionType: 'CHECKBOX',
          choiceItems: [''],
        });
        setQuestions(newQuestions);
      },
    },
  ];

  return (
    <div className="absolute -right-[10rem] border px-4 py-5 bg-white rounded-bs_5 border-gray30">
      <div className="text-bs_14 flex flex-col gap-3">
        {questionTypes.map((type, index) => (
          <button key={index} className="flex" onClick={type.onClick}>
            <BsPlusCircle size={18} />
            <span className="ml-1">{type.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
