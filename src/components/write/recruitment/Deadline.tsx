import 'react-day-picker/dist/style.css';

import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
export default function Deadline() {
  const today = new Date();
  const [selected, setSelected] = useState<Date>(today);
  const [isCalendarToggle, setIsCalendarToggle] = useState(true);

  const handleCalendarToggle = () => {
    setIsCalendarToggle(!isCalendarToggle);
  };

  return (
    <>
      <h2 className="text-bs_20 my-5">모집 마감</h2>
      <div className="relative w-full flex items-center">
        <input
          type="tel"
          value={selected && format(selected, 'yyyy-MM-dd')}
          className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
        />
        <div className="absolute right-5" onClick={handleCalendarToggle}>
          <FaRegCalendarAlt size={25} />
        </div>
      </div>
      {isCalendarToggle && (
        <div className="border border-gray10 mt-5 w-fit m-auto">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      )}
    </>
  );
}
