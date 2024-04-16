import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import { SetStateAction, useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';

interface IInputTagProps {
  className?: string;
  value: string | string[];
  setValue: (value: string | string[]) => void;
}

export default function InputTag({
  className,
  value,
  setValue,
}: IInputTagProps) {
  const [inputValue, setInputValue] = useState('');
  const [displayedValues, setDisplayedValues] = useState<string[]>([]);
  const inputRef = useRef(null);

  useEffect(
    function updateValue() {
      if (value) {
        if (typeof value === 'string') {
          const newValue = [value];
          setDisplayedValues(newValue);
        } else if (typeof value === 'object') {
          const newValue = [...value];
          setDisplayedValues(newValue);
        }
      }
    },
    [value]
  );

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleInputKey = (e: { key: string; keyCode: number }) => {
    if (e.key === 'Enter' || e.key === ',' || e.keyCode === 32) {
      let newValues;
      if (e.key === ',') {
        newValues = [...displayedValues, inputValue.replace(/,/g, '')];
      } else {
        newValues = [...displayedValues, inputValue];
      }

      setValue(typeof value === 'string' ? inputValue : newValues);

      setInputValue('');
    }
  };

  const handleDeleteButton = (index: number) => {
    // 현재 상태의 배열을 업데이트
    setDisplayedValues(
      (prevValues) => prevValues.filter((_, i) => i !== index)
      // => 특정 index(i)에 해당하는 요소를 제외한 새로운 배열을 생성
    );
    setValue(displayedValues.filter((_, i) => i !== index));
  };

  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center max-w-max_w overflow-hidden">
        {displayedValues.map((value, index) => (
          <div key={index} className="flex justify-between mr-1">
            <CustomButton
              onClick={() => handleDeleteButton(index)}
              color="hashtag"
              className="pl-3 pr-2 py-1 text-bs_14 mr-1 flex items-center">
              <p className="mr-2 text-nowrap">{value}</p>
              <span>
                <IoCloseOutline size={20} />
              </span>
            </CustomButton>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleInputKey}
          placeholder="태그를 입력해주세요."
          className="w-full min-w-40 h-[3.125rem] px-3 border border-gary30 rounded-bs_5 border-gray30"
        />
      </div>
    </div>
  );
}
