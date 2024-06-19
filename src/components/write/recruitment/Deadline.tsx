import 'react-day-picker/dist/style.css';
import 'moment/locale/ko';

import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';

interface IDeadlineProps {
  end: string;
  setEnd: (end: string) => void;
  hidden?: boolean;
  disable?: boolean;
}
export default function Deadline({
  end,
  setEnd,
  hidden = false,
  disable = false,
}: IDeadlineProps) {
  const today = new Date();
  const [selected, setSelected] = useState<Date | undefined>(today);
  const [isCalendarToggle, setIsCalendarToggle] = useState(!hidden);

  useEffect(() => {
    if (selected !== undefined) {
      const year = selected.getFullYear();
      const month = selected.getMonth() + 1;
      const day = selected.getDate();
      const monthPad = month.toString().padStart(2, '0');
      const selectDate = `${year}-${monthPad}-${day}`;
      setEnd(selectDate);
    }
  }, [selected]);

  useEffect(() => {
    const formattedDate = moment(end).toDate();

    setSelected(formattedDate);
  }, [end]);

  const handleCalendarToggle = () => {
    setIsCalendarToggle(!isCalendarToggle);
  };

  return (
    <>
      {!hidden && <h2 className="text-bs_20 my-5">모집 마감</h2>}

      <div className="relative w-full flex items-center">
        <input
          type="text"
          disabled
          value={selected && moment(selected).format('YYYY-MM-DD')}
          className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
        />
        {!disable && (
          <div className="absolute right-5" onClick={handleCalendarToggle}>
            <FaRegCalendarAlt size={25} />
          </div>
        )}
      </div>
      {isCalendarToggle && (
        <div
          className={`border border-gray10 mt-5 w-fit m-auto ${hidden && 'absolute bottom-0 left-0 right-0 bg-white z-10 p-5 px-10'}`}>
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      )}
    </>
  );
}
