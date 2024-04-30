import { useState } from 'react';

import MemoCard from './MemoCard';

interface IDashBoardManagementProps {
  localMemo: { id: string; text: string }[];
  setLocalMemo: (memo: { id: string; text: string }[]) => void;
  isLoading: boolean;
}

const LOCALMEMODATA = 'admin-memo';
export default function DashBoardManagement({
  localMemo,
  setLocalMemo,
  isLoading,
}: IDashBoardManagementProps) {
  const [textareaValue, setTextareaValue] = useState('');

  const handlePostMemo = () => {
    if (textareaValue.trim() !== '') {
      const newMemo: { id: string; text: string }[] = [
        ...localMemo,
        { id: Date.now().toString(), text: textareaValue },
      ];
      localStorage.setItem(LOCALMEMODATA, JSON.stringify(newMemo));
      setLocalMemo(newMemo);
      setTextareaValue('');
    }
  };

  return (
    <section className="w-full p-3">
      <div className="p-3 h-full bg-blue10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-bs_20 font-bold px-4">메모</h3>
        </div>
        <div className="flow-root px-4 pb-6">
          <textarea
            name="memo"
            id="memo"
            rows={4}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="w-full h-fit p-3 resize-none"
            placeholder="메모를 적어주세요."
          />
          <button
            onClick={() => {
              handlePostMemo();
            }}
            className="bg-black rounded-bs_5 mt-2 p-1 text-bs_14 text-white float-right">
            작성
          </button>
        </div>
        {localMemo && localMemo.length > 0 && (
          <span className="block border w-full"></span>
        )}
        {!isLoading && localMemo.length > 0 && (
          <MemoCard content={localMemo} setLocalMemo={setLocalMemo} />
        )}
      </div>
    </section>
  );
}
