import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { useGetSearchSkillStack } from '@/hooks/queries/useSearch';
import { ITechStackType } from '@/types/global';

interface SkillStackInput {
  techStackDtos: { techStack: string; iconUrl?: string }[];
  setTechStackDtos: (
    techStackDtos: { techStack: string; iconUrl?: string }[]
  ) => void;
  hidden?: boolean;
}

export default function SkillStackInput({
  hidden = false,
  techStackDtos,
  setTechStackDtos,
}: SkillStackInput) {
  const [text, setText] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const { isLoading, data } = useGetSearchSkillStack(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTechStackDtosPush = (name: string, icon: string) => {
    if (techStackDtos.some((item) => item.techStack === '')) {
      setTechStackDtos([{ techStack: name, iconUrl: icon }]);
    } else if (!techStackDtos.some((item) => item.techStack === name)) {
      setTechStackDtos([{ techStack: name, iconUrl: icon }, ...techStackDtos]);
    }
    setIsToggle(false);
    inputRef.current?.blur();
  };

  const handleTechStackDtosDelete = (index: number) => {
    setTechStackDtos(techStackDtos.filter((_, i) => i !== index));
  };

  return (
    <>
      {!hidden && <h2 className={`text-bs_20 mb-5 font-bold`}>기술 스택</h2>}

      <input
        ref={inputRef}
        type="text"
        placeholder={`입력해주세요.`}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => setIsToggle(true)}
        onBlur={() => setIsToggle(false)}
        className={`w-full h-[3.125rem] px-5 border ${hidden ? 'border-gray30' : 'border-gray10'} border-gray30 rounded-bs_5`}
      />

      {isLoading
        ? null
        : data?.length > 0 &&
          isToggle && (
            <ul className="relative rounded-bs_5 overflow-hidden border border-gray10 bg-white z-[10] mt-3">
              {data?.map((item: ITechStackType, index: number) => {
                if (
                  item.techStack
                    .toLocaleLowerCase()
                    .includes(text.toLocaleLowerCase())
                ) {
                  return (
                    <li
                      key={`${item.techStack}-${index}`}
                      className="w-full h-[3.125rem] max-h-[15.625rem] p-[0.625rem] hover:bg-gray10 flex items-center overflow-y-auto cursor-pointer custom-scrollbar"
                      onClick={() =>
                        handleTechStackDtosPush(item.techStack, item.iconUrl)
                      }
                      onMouseDown={(e) => e.preventDefault()}>
                      {item.techStack}
                    </li>
                  );
                }
              })}
            </ul>
          )}

      <ul className="flex mt-5 gap-2 max-h-[12.5rem] overflow-y-auto">
        {techStackDtos?.map((item, index) => (
          <li
            key={`${item.techStack}-${index}`}
            className={`relative w-10 h-10 rounded-full ${!item.iconUrl && 'border border-gray10'}`}>
            {item.iconUrl && (
              <Image src={item.iconUrl} alt="아이콘 이미지" fill />
            )}
            <IoCloseOutline
              size={20}
              className="absolute -top-2 -right-2 cursor-pointer"
              onClick={() => handleTechStackDtosDelete(index)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
