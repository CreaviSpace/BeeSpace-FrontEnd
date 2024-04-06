import { useEffect, useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';
import { parseEnum } from '@/utils/parseEnum';

interface IMemberListProps {
  positions?: {
    members: {
      memberId: number;
      memberNickname: string;
      memberProfile: string;
    }[];
    position: string;
  }[];
  setMemberDtos: (positions: { memberId: number; position: string }[]) => void;
}

export default function MemberList({
  positions,
  setMemberDtos,
}: IMemberListProps) {
  const optionNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectNum, setSelectNum] = useState<number[]>([1]);

  const options = ['선택해주세요', '백엔드', '프론트엔드', '디자인', '기획'];
  const [selectPosition, setSelectPosition] = useState<string[]>(['default']);

  const [memberId, setMemberId] = useState<number[]>([0]);

  useEffect(() => {
    if (positions && positions.length > 0) {
      setSelectNum([positions.length]);
      const selectPosition: string[] = [];
      const memberId: number[] = [];
      let selectNum = 0;
      positions.map((members) => {
        selectPosition.push(members.position);
        members.members.map((member) => {
          memberId.push(member.memberId);
          selectNum += 1;
        });
      });
      setSelectNum([selectNum]);
      setSelectPosition(selectPosition);
      setMemberId(memberId);
    }
  }, [positions]);

  useEffect(() => {
    const memberDtos: { memberId: number; position: string }[] = [];
    selectPosition.forEach((_, index) => {
      memberDtos.push({
        memberId: memberId[index],
        position: parseEnum(selectPosition[index]),
      });
    });
    setMemberDtos(memberDtos);
  }, [selectPosition, memberId]);

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
        <div key={index} className="flex gap-2 min_mobile:flex-col">
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
            className="border border-gray30 rounded-bs_5 text-bs_14 pl-3 h-[3.125rem] w-1/2 min_mobile:w-full"
            value={
              memberId[index] === 0 ? '닉네임을 입력해주세요' : memberId[index]
            }
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
