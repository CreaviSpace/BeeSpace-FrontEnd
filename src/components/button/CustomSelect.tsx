import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { useState } from 'react';

interface ICustomSelectProps {
  option: string[] | number[];
  setOption?: (option: (string | number)[]) => void;
  personnel: string[] | number[];
  setPersonnel: (personnel: (string | number)[]) => void;
  index: number;
  className?: string;
  handler?: (num: number) => void;
}

export default function CustomSelect({
  option,
  setOption,
  personnel,
  setPersonnel,
  index,
  className,
  handler,
}: ICustomSelectProps) {
  const [isOnOff, setIsOnOff] = useState(false);

  const handleOnOffToggle = () => {
    if (isOnOff) {
      setIsOnOff(false);
    } else {
      setIsOnOff(true);
    }
  };

  const handleOptionValue = (item: string | number) => {
    const copyPersonnel = [...personnel];
    copyPersonnel[index] = item;
    setPersonnel(copyPersonnel);

    if (typeof item === 'number' && item === 0 && handler) {
      handler(index);
    }

    if (setOption) {
      if (copyPersonnel.some((prev) => prev === copyPersonnel[index])) {
        const copyOption = option.filter((prev) => prev !== item);
        setOption(copyOption);
        if (personnel[index] !== `default`) {
          const newOption = [...copyOption, personnel[index]];
          setOption(newOption);
        }
      }
    }
  };

  return (
    <section
      className={`relative w-full h-[3.125rem] my-5 border border-gray10 rounded-bs_5 ${className}`}
      onClick={handleOnOffToggle}>
      <label
        htmlFor=""
        className="absolute top-0 left-0 px-5 w-full h-[3.125rem] p-[0.625rem] flex justify-between items-center -z-[1]">
        {personnel[index] !== `default` ? personnel[index] : '선택해주세요.'}
        <span className={`${isOnOff && '-rotate-180 transition-all'}`}>
          <IoIosArrowDown size={20} />
        </span>
      </label>

      {isOnOff && (
        <ul className="relative mt-[3.75rem] rounded-bs_5 overflow-hidden border border-gray10  bg-white z-[10]">
          {option.map((item) => (
            <li
              key={`${item}-${index}`}
              className="w-full h-[3.125rem] p-[0.625rem] hover:bg-gray10 flex items-center"
              onClick={() => {
                handleOptionValue(item);
              }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
