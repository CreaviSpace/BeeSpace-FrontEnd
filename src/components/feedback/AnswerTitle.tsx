interface IQuestionTitleProps {
  question: string;
}

export default function AnswerTitle({ question }: IQuestionTitleProps) {
  return (
    <>
      <label htmlFor="CheckBoxQuestionInput" className="sr-only">
        질문
      </label>
      <h2 className="w-full border-b border-gray20 p-2 bg-[#f7f7f7]">
        {question}
      </h2>
    </>
  );
}
