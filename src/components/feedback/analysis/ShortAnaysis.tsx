import AnswerTitle from '../AnswerTitle';

interface IShortAnaysisProps {
  answer: {
    answers: string[];
    question: string;
    questionType: string;
  };
}

export default function ShortAnaysis({ answer }: IShortAnaysisProps) {
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative ">
      <AnswerTitle question={answer.question} />

      <ul>
        {answer.answers.map((item, index) => (
          <li key={index} className="p-2 border-b border-gray20">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
