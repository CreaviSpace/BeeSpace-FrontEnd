import { SetStateAction, useState } from 'react';

export default function TagInput() {
  const [inputValue, setInputValue] = useState('');
  const [displayedValue, setDisplayedValue] = useState('');

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleEnterKey = (e: { key: string }) => {
    if (e.key === 'Enter') {
      setDisplayedValue(inputValue);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
        placeholder="태그를 입력해주세요."
        className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
      />
      {displayedValue && (
        <div className="mt-2 top-0 left-3">
          <p>{displayedValue}</p>
        </div>
      )}
    </div>
  );
}
