import { ChangeEvent, useEffect, useState } from 'react';

export default function MemberList() {
  const [selectOption, setSelectOption] = useState(1);
  const [selectPlus, setSelectPlus] = useState<number[]>([]);

  const [optionNum] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const options = [
    { value: 'pick', title: '선택해주세요' },
    { value: 'backend', title: '백엔드' },
    { value: 'frontend', title: '프론트엔드' },
    { value: 'design', title: '디자인' },
    { value: 'plan', title: '기획' },
  ];

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 1개의 입력 필드가 존재하도록 초기화
    updateSeletNumber(1);
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // 변경되는 옵션의 수를 관찰하고 updateSeletNumber에 값을 전달
    const newSeletOption = parseInt(e.target.value, 10);
    setSelectOption(newSeletOption);
    updateSeletNumber(newSeletOption);
  };

  const updateSeletNumber = (optionValue: number) => {
    // 전달받은 옵션 숫자만큼 selet 개수를 업데이트
    setSelectPlus(Array.from({ length: optionValue }, (_, index) => index));
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="memberNum" className="sr-only">
        멤버 수
      </label>
      <select
        name="memberNum"
        id="memberNum"
        required
        className="px-4 py-2 bg-primary rounded-bs_5 w-24 font-bold appearance-none"
        onChange={handleOptionChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      {selectPlus.map((index) => (
        <div key={index} className="flex gap-2">
          <select
            name="members"
            id="members"
            className="border border-gray30 px-4 py-2 rounded-bs_5 w-fit">
            {options.map((option, index) => (
              <option key={`option-${index}`} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="border border-gray30 rounded-bs_5 w-1/2 text-bs_14 pl-3"
            required
          />
        </div>
      ))}
    </div>
  );
}
