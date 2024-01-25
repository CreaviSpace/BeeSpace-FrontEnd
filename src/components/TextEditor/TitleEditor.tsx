export default function TitleEditor() {
  return (
    <div>
      <h1 className="text-bs_20 font-bold my-5">제목</h1>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="border border-gray10 w-full p-3 rounded-bs_5"
      />
    </div>
  );
}
