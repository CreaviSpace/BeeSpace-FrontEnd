interface ITitleEditor {
  title: string;
  setTitle: (title: string) => void;
}

export default function TitleEditor({ title, setTitle }: ITitleEditor) {
  return (
    <div>
      <h1 className="text-bs_20 font-bold my-5">제목</h1>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
        className="border border-gray10 w-full p-3 rounded-bs_5"
      />
    </div>
  );
}
