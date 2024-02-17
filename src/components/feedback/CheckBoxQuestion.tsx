import DeleteButton from './DeleteButton';

export default function CheckBoxQuestion() {
  const handleOptionPlus = () => {};

  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="MultipleChoiceQuestionInput" className="sr-only">
        질문
      </label>
      <input
        type="text"
        name="MultipleChoiceQuestionInput"
        id="MultipleChoiceQuestionInput"
        placeholder="질문을 입력해주세요."
        className="w-full border border-gray20 p-2 rounded-bs_5 bg-[#f7f7f7]"
      />
      <ul>
        <li className="flex items-center gap-2 h-fit mt-3">
          <label
            htmlFor="MultipleChoiceAnswerInput"
            className="border-2 rounded-bs_5 border-gray40 p-2 bg-white"></label>
          <input
            type="text"
            name="MultipleChoiceAnswerInput"
            id="MultipleChoiceAnswerInput"
            placeholder="옵션1"
            className="w-full border-b border-gray20 p-2"
          />
        </li>
      </ul>
      <DeleteButton />
    </div>
  );
}
