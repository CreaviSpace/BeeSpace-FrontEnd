import { useEffect, useState } from 'react';

import SelectButton from '@/components/button/SelectButton';
import { useGetSearchMember } from '@/hooks/queries/useSearch';
import { parseEnum } from '@/utils/parseEnum';
import { parseValue } from '@/utils/parseValue';

interface IMemberListProps {
  positions?: {
    members: {
      memberId: string;
      memberNickname: string;
      memberProfile: string;
    }[];
    position: string;
  }[];
  setMemberDtos: (positions: { memberId: string; position: string }[]) => void;
}

export default function MemberList({
  positions,
  setMemberDtos,
}: IMemberListProps) {
  const [selectNum, setSelectNum] = useState<number[]>([1]);
  const [selectPosition, setSelectPosition] = useState<string[]>(['default']);
  const [memberId, setMemberId] = useState<string[]>(['default']);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isToggle, setIsToggle] = useState(false);

  const [options, setOptions] = useState<string[]>([
    '백엔드',
    '프론트엔드',
    '디자인',
    '기획',
  ]);
  const [optionsNum, setOptionsNum] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const { isLoading, data } = useGetSearchMember(
    memberId.length > 0 ? memberId[currentIndex] : ''
  );

  useEffect(() => {
    if (positions && positions.length > 0) {
      setSelectNum([positions.length]);
      const selectPosition: string[] = [];
      const memberId: string[] = [];
      let selectNum = 0;
      positions.map((members) => {
        selectPosition.push(parseValue(members.position));
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
    const memberDtos: { memberId: string; position: string }[] = [];
    selectPosition.forEach((_, index) => {
      memberDtos.push({
        memberId: memberId[index],
        position: parseEnum(selectPosition[index]),
      });
    });
    setMemberDtos(memberDtos);
  }, [selectPosition, memberId]);

  const handleUpdateSeletPuls = (personnel: (string | number)[]) => {
    const newSelectPlus = Array.from(
      { length: personnel[0] as number },
      () => ''
    );

    const newMemberId = Array.from(
      {
        length: personnel[0] as number,
      },
      () => ''
    );

    setSelectNum([newSelectPlus.length]);
    setMemberId(newMemberId);
    setSelectPosition(newSelectPlus);
  };

  const handleonClickId = (index: number, currentId: string) => {
    const newMemberId = [...memberId];
    newMemberId[index] = currentId;
    setMemberId(newMemberId);
    setIsToggle(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <SelectButton
        option={optionsNum}
        setOption={setOptionsNum as (option: (string | number)[]) => void}
        select={selectNum}
        setSelect={
          handleUpdateSeletPuls as (personnel: (string | number)[]) => void
        }
        index={0}
        className="px-4 py-2 bg-primary rounded-bs_5 font-bold appearance-none max-w-24"
        hidden={false}
      />

      {selectPosition.map((_, index) => (
        <div key={index} className="flex gap-2 min_mobile:flex-col">
          <SelectButton
            option={options}
            setOption={setOptions as (option: (string | number)[]) => void}
            select={selectPosition}
            setSelect={
              setSelectPosition as (personnel: (string | number)[]) => void
            }
            index={index}
            hidden={false}
          />
          <div className="h-[3.125rem] w-1/2 min_mobile:w-full">
            <label htmlFor="memberId" className="sr-only">
              멤버 닉네임 및 고유 아이디 입력창
            </label>
            <input
              id="memberId"
              name="memberId"
              type="text"
              placeholder="닉네임을 입력해주세요."
              className="border border-gray30 rounded-bs_5 text-bs_14 pl-3 h-full w-full"
              value={memberId[index] === 'default' ? '' : memberId[index]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newMemberId = memberId;
                memberId[index] = e.target.value;
                setMemberId([...newMemberId]);
              }}
              maxLength={8}
              onFocus={() => {
                setCurrentIndex(index);
                setIsToggle(true);
              }}
              onBlur={() => {
                setIsToggle(false);
              }}
              required
            />

            {currentIndex === index &&
            !isLoading &&
            isToggle &&
            data?.length > 0 ? (
              <ul
                className="border border-gray30 rounded-bs_5 mt-3 max-h-[15.625rem] w-full bg-white relative overflow-auto"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}>
                {data?.map(
                  (item: { memberNickname: string; memberId: string }) => (
                    <li
                      key={item.memberId}
                      className="p-2 pl-3 h-[3.125rem]  flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleonClickId(index, item.memberId)}>
                      <p>{item.memberNickname}</p>
                      <p className="text-gray30">#{item.memberId}</p>
                    </li>
                  )
                )}
              </ul>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
