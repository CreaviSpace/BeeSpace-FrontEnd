import { useEffect, useState } from 'react';

import MemoCard from './MemoCard';

const LOCALMEMODATA = 'admin-memo';
export default function DashBoardManagement() {
  const [textareaValue, setTextareaValue] = useState('');
  const [localMemo, setLocalMemo] = useState<{ id: string; text: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMemo = localStorage.getItem(LOCALMEMODATA);
    if (getMemo) {
      setLocalMemo(JSON.parse(getMemo));
    }
    setIsLoading(false);
  }, []);

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
          <h3 className="text-bs_20 font-bold">메모</h3>
        </div>
        <div className="flow-root px-4 py-6">
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
        {localMemo && <span className="block border w-full"></span>}
        {!isLoading && (
          <MemoCard content={localMemo} setLocalMemo={setLocalMemo} />
        )}
      </div>
    </section>
  );
}
