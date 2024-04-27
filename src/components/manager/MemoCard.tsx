import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import { useState } from 'react';

const LOCALMEMODATA = 'admin-memo';
const KEY = Date.now().toString();

interface IMemoCardProps {
  content: { id: string; text: string }[];
  setLocalMemo: (content: { id: string; text: string }[]) => void;
}
export default function MemoCard({ content, setLocalMemo }: IMemoCardProps) {
  const [click, setClick] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleClick = (id: string, text: string) => {
    setClick(id);
    setTextareaValue(text);
  };

  const handlePutMemo = (index: number) => {
    const newPutMemo = [...content];
    newPutMemo[index].text = textareaValue;
    localStorage.setItem(LOCALMEMODATA, JSON.stringify(newPutMemo));
    setLocalMemo(newPutMemo);
  };

  const handleDeleteMemo = (index: number) => {
    const newDeleteMemo = [...content];
    const newMemo = newDeleteMemo.filter(
      (item) => newDeleteMemo[index].id !== item.id
    );
    localStorage.setItem(LOCALMEMODATA, JSON.stringify(newMemo));
    setLocalMemo(newMemo);
  };

  return (
    <div>
      {content.map((item, index) => (
        <>
          {item.id === click ? (
            <div className="flow-root mt-4 p-4">
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
                  handlePutMemo(index);
                  handleClick('', '');
                }}
                className="bg-black rounded-bs_5 mt-2 p-1 text-bs_14 text-white float-right">
                작성
              </button>
            </div>
          ) : (
            <div className="flow-root mt-4 p-3">
              <IoCloseOutline
                size={25}
                onClick={() => handleDeleteMemo(index)}
                className="float-right"
              />
              <p className="mt-6 w-full border-gray30 p-3">{item.text}</p>
              <button
                onClick={() => {
                  handleClick(item.id, item.text);
                }}
                className="mt-2 bg-black rounded-bs_5 p-1 text-bs_14 text-white float-right">
                수정
              </button>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
