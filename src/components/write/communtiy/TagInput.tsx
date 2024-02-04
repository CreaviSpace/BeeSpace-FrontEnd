import { SetStateAction, useEffect, useRef, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';

export default function TagInput() {
  const [inputValue, setInputValue] = useState('');
  const [displayedValues, setDisplayedValues] = useState<string[]>([]);
  const inputRef = useRef(null);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleInputKey = (e: { key: string }) => {
    // 'Enter' 키 입력시
    if (e.key === 'Enter') {
      // value 값 배열 생성
      setDisplayedValues((prevValues) => [...prevValues, inputValue]);
      // input 태그 value 삭제
      setInputValue('');
    } else if (e.key === ',') {
      // ',' 입력시 쉼표를 제거하고 value 값 배열 생성
      setDisplayedValues((prevValues) => [
        ...prevValues,
        inputValue.replace(/,/g, ''),
      ]);
      // input 태그 value 삭제
      setInputValue('');
    }
  };

  const handleDeleteButton = (index: number) => {
    // 현재 상태의 배열을 업데이트
    setDisplayedValues(
      (prevValues) => prevValues.filter((_, i) => i !== index)
      // => 특정 index(i)에 해당하는 요소를 제외한 새로운 배열을 생성
    );
  };

  useEffect(() => {}, [displayedValues]);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {displayedValues.map((value, index) => (
          <div key={index} className="flex justify-between mr-1">
            <CustomButton
              onClick={() => handleDeleteButton(index)}
              color="hashtag"
              className="max-h-[2rem] px-2 text-bs_14">
              {value} <button>X</button>
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
          className="w-full h-[3.125rem] px-3 border border-gary30 rounded-bs_5 border-gray30"
        />
      </div>
    </div>
  );
}
