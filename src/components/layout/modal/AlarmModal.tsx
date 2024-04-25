import Link from 'next/link';
import { useEffect } from 'react';

import useAlarm from '@/hooks/alarm/useAlarm';
import useAlarmDelete from '@/hooks/alarm/useAlarmDelete';

interface IAlarmType {
  id: number;
  alarmMessage: string;
  postType: string;
  postId: number;
  readStatus: string;
}

interface IAlarmModalProps {
  isLoading: boolean;
  isAlarm: boolean;
  data: IAlarmType[];
}

export default function AlarmModal({
  isLoading,
  isAlarm,
  data,
}: IAlarmModalProps) {
  const { mutate: AlarmRead } = useAlarm();
  const { mutate: AlarmDelete } = useAlarmDelete();

  useEffect(() => {
    if (isAlarm) AlarmRead();
  }, []);

  return (
    <li
      className="w-[25rem] h-[25rem] bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14 overflow-auto mobile:max-w-[18rem] mobile:max-h-[18rem]"
      tabIndex={0}
      onMouseDown={(e) => {
        e.preventDefault();
      }}>
      <label htmlFor="alarm" className="mx-auto font-bold text-bs_16">
        알람
      </label>

      <button className="text-right" onClick={() => AlarmDelete()}>
        알람 지움
      </button>

      {isLoading && data?.length === 0 ? (
        <label htmlFor="message" className="text-start">
          알림이 없습니다.
        </label>
      ) : (
        data?.map((item: IAlarmType, index: number) => (
          <div key={index}>
            <Link
              href={`/${item.postType}/${item.postId}`}
              className={`flex items-center gap-1 ${item.readStatus === 'READ' ? 'text-gray30' : 'text-black'}`}>
              <label htmlFor="message" className="text-start">
                {/* {item.alarmType}이 {parseValue(item.postType)}에 달렸습니다. */}
                {item.alarmMessage}
              </label>
              {/* 이동 <FaArrowRight /> */}
            </Link>
          </div>
        ))
      )}
    </li>
  );
}
