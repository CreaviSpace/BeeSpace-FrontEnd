export default function SkillStack() {
  return (
    <>
      <h2 className="text-bs_20 my-5">기술 스택</h2>
      <input
        type="text"
        placeholder={`입력해주세요.`}
        className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
      />

      <ul className="relative rounded-bs_5 overflow-hidden border border-gray10  bg-white z-[10]">
        <li className="w-full h-[3.125rem] p-[0.625rem] hover:bg-gray10 flex items-center">
          react
        </li>
      </ul>

      <ul className="flex mt-5">
        <li className="w-10 h-10 rounded-full border border-gray10"></li>
        <li className="w-10 h-10 rounded-full border border-gray10"></li>
      </ul>
    </>
  );
}
