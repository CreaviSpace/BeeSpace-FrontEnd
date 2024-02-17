import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';
import { useState } from 'react';

export default function DashBoardManagement() {
  const [isMemo, setIsMemo] = useState(false);

  const handleIsMemo = () => {
    setIsMemo(!isMemo);
  };

  return (
    <section className="w-full p-3">
      <div className="p-3 h-full bg-blue10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-bs_20 font-bold">메모</h3>
          <AiFillPlusCircle
            size={25}
            onClick={handleIsMemo}
            className="cursor-pointer"
          />
        </div>

        {isMemo && (
          <textarea
            name="memo"
            id="memo"
            rows={2}
            className="w-full h-fit p-3 resize-none"
            placeholder="메모를 적어주세요."
          />
        )}
      </div>
    </section>
  );
}
