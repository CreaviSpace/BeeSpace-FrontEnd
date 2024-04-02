import { IQuestionAnswerType } from '@/types/global';

interface ICheckBoxAnswerProps {
  question: IQuestionAnswerType;
}

export default function MultipleChoiceAnswer({
  question,
}: ICheckBoxAnswerProps) {
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="MultipleChoiceQuestionInput" className="sr-only">
        질문
      </label>
      <h2 className="w-full border-b border-gray20 p-2 bg-[#f7f7f7]">
        {question.question}
      </h2>

      <label htmlFor="MultipleChoiceQuestionInput" className="sr-only">
        대답
      </label>
      <ul>
        {question.choiceItems?.map((item, index) => (
          <li key={index} className="flex items-center gap-2 h-fit mt-3">
            <input
              type="radio"
              id={question.question}
              name={question.question}></input>
            <p className="w-full border-b border-gray20 p-2">{item.item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
