export default function MemberList() {
  return (
    <div className="flex flex-col gap-2">
      <select
        name="members"
        id="members"
        className="px-4 py-2 bg-primary rounded-bs_5 w-24 font-bold">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <div className="flex gap-2">
        <select
          name="members"
          id="members"
          className="border border-gray30 px-4 py-2 rounded-bs_5 w-36">
          <option value="pick">선택해주세요</option>
          <option value="front">프론트엔드</option>
          <option value="end">백엔드</option>
          <option value="design">디자인</option>
          <option value="plan">기획</option>
        </select>
        <input
          type="text"
          className="border border-gray30  rounded-bs_5 w-1/2"
        />
      </div>
      <div className="flex gap-2">
        <select
          name="members"
          id="members"
          className="border border-gray30 px-4 py-2 rounded-bs_5 w-36">
          <option value="select">선택해주세요</option>
          <option value="front">프론트엔드</option>
          <option value="end">백엔드</option>
          <option value="design">디자인</option>
          <option value="plan">기획</option>
        </select>
        <input
          type="text"
          className="border border-gray30  rounded-bs_5 w-1/2"
        />
      </div>
      <div className="flex gap-2">
        <select
          name="members"
          id="members"
          className="border border-gray30 px-4 py-2 rounded-bs_5 w-36">
          <option value="select">선택해주세요</option>
          <option value="front">프론트엔드</option>
          <option value="end">백엔드</option>
          <option value="design">디자인</option>
          <option value="plan">기획</option>
        </select>
        <input
          type="text"
          className="border border-gray30  rounded-bs_5 w-1/2"
        />
      </div>
    </div>
  );
}
