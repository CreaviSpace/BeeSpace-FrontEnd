import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import { useEffect, useState } from 'react';

const LOCALMEMODATA = 'admin-memo';
const KEY = Date.now();
export default function DashBoardManagement() {
  const [click, setClick] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    const getMemo = localStorage.getItem(LOCALMEMODATA);
    const parseMemo = getMemo ? JSON.parse(getMemo) : [];
    setMemo(parseMemo);
  }, [click]);

  const handleClick = () => {
    if (textareaValue) {
      setClick(!click);
    }
  };

  const handlePutMemo = () => {
    if (textareaValue !== '') {
      localStorage.setItem(LOCALMEMODATA, JSON.stringify(textareaValue));
    }
  };

  const handleDeleteMemo = () => {
    localStorage.removeItem(LOCALMEMODATA);
    setMemo('');
  };
  return (
    <section className="w-full p-3">
      <div className="p-3 h-full bg-blue10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-bs_20 font-bold">메모</h3>
        </div>
        {click ? (
          <div className="flow-root">
            <textarea
              name="memo"
              id="memo"
              rows={2}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              className="w-full h-fit p-3 resize-none"
              placeholder="메모를 적어주세요."
            />
            <button
              onClick={() => {
                handlePutMemo();
                handleClick();
              }}
              className="bg-black rounded-bs_5 p-1 text-bs_14 text-white float-right">
              작성
            </button>
          </div>
        ) : (
          <div className="flow-root">
            <IoCloseOutline
              size={25}
              onClick={handleDeleteMemo}
              className="float-right"
            />
            <p className="mt-6 w-full border-gray30 p-3">{memo}</p>
            <button
              onClick={() => {
                handleClick();
              }}
              className="mt-2 bg-black rounded-bs_5 p-1 text-bs_14 text-white float-right">
              수정
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
