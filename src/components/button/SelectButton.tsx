import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { useRef, useState } from 'react';

interface ISelectButtonProps {
  option: string[] | number[];
  setOption?: (option: (string | number)[]) => void;
  select: string[] | number[];
  setSelect: (personnel: (string | number)[]) => void;
  index: number;
  className?: string;
  handler?: (num: number) => void;
  hidden?: boolean;
}

export default function SelectButton({
  option,
  setOption,
  select,
  setSelect,
  index,
  className,
  handler,
  hidden = true,
}: ISelectButtonProps) {
  const [isToggle, setIsToggle] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleOptionValue = (item: string | number) => {
    const copyPersonnel = [...select];
    copyPersonnel[index] = item;
    setSelect(copyPersonnel);

    if (typeof item === 'number' && item === 0 && handler) {
      handler(index);
    }

    // if (hidden && setOption) {
    //   if (copyPersonnel.some((prev) => prev === copyPersonnel[index])) {
    //     const copyOption = option.filter((prev) => prev !== item);
    //     setOption(copyOption);
    //     if (select[index] !== `default`) {
    //       const newOption = [...copyOption, select[index]];
    //       setOption(newOption);
    //     }
    //   }
    // }
  };

  const handleButtonOnClick = () => {
    if (isToggle) {
      divRef.current?.blur();
    } else {
      divRef.current?.focus();
    }
    setIsToggle(!isToggle);
  };

  const handleItemOnClick = (item: string | number) => {
    setIsToggle(false);
    handleOptionValue(item);
  };

  return (
    <section
      className={`relative w-full h-[3.125rem] mb-2 mr-2 border border-gray10 rounded-bs_5 ${className}`}>
      <button
        className="absolute top-0 left-0 px-5 w-full h-[3.125rem] p-[0.625rem] flex justify-between items-center z-[1] cursor-pointer"
        onClick={handleButtonOnClick}
        onMouseDown={(e) => e.preventDefault()}>
        {select[index] === `default` || select[index] === ''
          ? '선택해주세요.'
          : select[index]}
        <span className={`${isToggle && '-rotate-180 transition-all'}`}>
          <IoIosArrowDown size={20} />
        </span>
      </button>

      <div
        ref={divRef}
        tabIndex={0}
        onFocus={() => setIsToggle(true)}
        onBlur={() => setIsToggle(false)}
        onMouseDown={(e) => e.preventDefault()}>
        {isToggle && (
          <ul className="relative max-h-[15.625rem] mt-[3.75rem] rounded-bs_5 overflow-y-scroll border border-gray10  bg-white z-[10] custom-scrollbar">
            {option.map((item) => (
              <li
                key={`${item}-${index}`}
                className="w-full h-[3.125rem] p-[0.625rem] hover:bg-gray10 flex items-center cursor-pointer"
                onClick={() => handleItemOnClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
