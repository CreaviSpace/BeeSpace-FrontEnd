import DeleteButton from './DeleteButton';

export default function ShortAnswerQuestion() {
  const handleOptionPlus = () => {};
  return (
    <div className="w-full border border-gray30 rounded-bs_5 py-6 px-8 bg-white relative">
      <label htmlFor="ShortAnswerQuestionInput" className="sr-only">
        질문
      </label>
      <input
        type="text"
        name="ShortAnswerQuestionInput"
        id="ShortAnswerQuestionInput"
        placeholder="질문을 입력해주세요."
        className="w-full border border-gray20 p-2 rounded-bs_5 bg-[#f7f7f7]"
      />
      <label htmlFor="ShortAnswerAnswerInput" className="sr-only">
        대답
      </label>
      <input
        type="text"
        name="ShortAnswerAnswerInput"
        id="ShortAnswerAnswerInput"
        placeholder="단답형 텍스트"
        className="w-full border-b border-gray20 p-1 mt-3 text-bs_14"
      />
      <DeleteButton />
    </div>
  );
}
