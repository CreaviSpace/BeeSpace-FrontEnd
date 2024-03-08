import { useEffect, useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';

interface IMemberList {
  setMemberDtos: (memberDtos: { memberId: number; position: string }[]) => void;
}

export default function MemberList({ setMemberDtos }: IMemberList) {
  // const [selectOption, setSelectOption] = useState(1);
  // const [selectPlus, setSelectPlus] = useState<number[]>([0]);

  const optionNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectNum, setSelectNum] = useState([1]);

  const options = ['선택해주세요', '백엔드', '프론트엔드', '디자인', '기획'];
  const [selectPosition, setSelectPosition] = useState(['default']);

  const [memberId, setMemberId] = useState([0]);

  useEffect(() => {
    const memberDtos: { memberId: number; position: string }[] = [];
    selectPosition.forEach((_, index) => {
      memberDtos.push({
        memberId: memberId[index],
        position: selectPosition[index],
      });
    });
    setMemberDtos(memberDtos);
  }, [selectPosition, memberId]);

  // useEffect(() => {
  //   // 페이지가 처음 렌더링될 때 1개의 입력 필드가 존재하도록 초기화
  //   updateSeletNumber(1);
  // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

  // const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   // 변경되는 옵션의 수를 관찰하고 updateSeletNumber에 값을 전달
  //   const newSeletOption = parseInt(e.target.value, 10);
  //   setSelectOption(newSeletOption);
  //   updateSeletNumber(newSeletOption);
  // };

  const updateSeletPuls = (personnel: (string | number)[]) => {
    const newSelectPlus = Array.from(
      { length: personnel[0] as number },
      () => 'default'
    );

    const newMemberId = Array.from(
      {
        length: personnel[0] as number,
      },
      () => 0
    );

    setSelectNum([newSelectPlus.length]);
    setMemberId(newMemberId);
    setSelectPosition(newSelectPlus);
    // 전달받은 옵션 숫자만큼 selet 개수를 업데이트
    // setSelectPlus(Array.from({ length: optionValue }, (_, index) => index));
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="memberNum" className="sr-only">
        멤버 수
      </label>
      <CustomSelect
        option={optionNum}
        select={selectNum}
        setSelect={updateSeletPuls as (personnel: (string | number)[]) => void}
        index={0}
        className="px-4 py-2 bg-primary rounded-bs_5 font-bold appearance-none max-w-24"
      />

      {selectPosition.map((item, index) => (
        <div key={index} className="flex gap-2">
          <CustomSelect
            option={options}
            select={selectPosition}
            setSelect={
              setSelectPosition as (personnel: (string | number)[]) => void
            }
            index={index}
          />
          <input
            type="number"
            placeholder="닉네임을 입력해주세요."
            className="border border-gray30 rounded-bs_5 w-1/2 text-bs_14 pl-3"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newMemberId = memberId;
              memberId[index] = parseInt(e.target.value);
              setMemberId([...newMemberId]);
            }}
            required
          />
        </div>
      ))}
    </div>
  );
}
