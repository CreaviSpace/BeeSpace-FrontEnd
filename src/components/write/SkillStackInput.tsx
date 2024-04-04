import { useState } from 'react';

import useSkillStackSearch from '@/hooks/useSkillStackSearch';
import { ITechStackType } from '@/types/global';

interface SkillStackInput {
  techStackDtos: { techStackId: number }[];
  setTechStackDtos: (techStackDtos: { techStackId: number }[]) => void;
}

export default function SkillStackInput({
  techStackDtos,
  setTechStackDtos,
}: SkillStackInput) {
  const [text, setText] = useState('');
  const { isLoading, isError, data } = useSkillStackSearch(text);

  const handleTechStackDtosPush = (id: number) => {
    if (techStackDtos.some((item) => item.techStackId === 0)) {
      setTechStackDtos([{ techStackId: id }]);
    } else if (!techStackDtos.some((item) => item.techStackId === id)) {
      setTechStackDtos([{ techStackId: id }, ...techStackDtos]);
    }
  };

  return (
    <>
      <h2 className="text-bs_20 mb-5 font-bold">기술 스택</h2>
      <input
        type="text"
        placeholder={`입력해주세요.`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
      />

      <ul className="relative rounded-bs_5 overflow-hidden border border-gray10 bg-white z-[10]">
        {isLoading
          ? '로딩중'
          : data?.length > 0 &&
            data?.map((item: ITechStackType) => {
              if (
                item.techStack
                  .toLocaleLowerCase()
                  .includes(text.toLocaleLowerCase())
              ) {
                return (
                  <li
                    key={item.techStackId}
                    className="w-full h-[3.125rem] max-h-[15.625rem] p-[0.625rem] hover:bg-gray10 flex items-center overflow-y-auto custom-scrollbar"
                    datatype="0"
                    onClick={() => {
                      handleTechStackDtosPush(item.techStackId);
                    }}>
                    {item.techStack}
                  </li>
                );
              }
            })}
      </ul>

      <ul className="flex mt-5 gap-2">
        {techStackDtos?.map((item) => (
          <li
            key={item.techStackId}
            className="w-10 h-10 rounded-full border border-gray10"></li>
        ))}
      </ul>
    </>
  );
}
