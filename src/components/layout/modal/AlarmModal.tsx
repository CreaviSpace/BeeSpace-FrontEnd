import { FaArrowRight } from '@react-icons/all-files/fa/FaArrowRight';
import Link from 'next/link';

import useAlarm from '@/hooks/alarm/useAlarm';

interface IAlarmType {
  id: number;
  alarmType: string;
  postType: string;
  postId: number;
  readStatus: string;
}

interface IAlarmModalProps {
  isLoading: boolean;
  data: IAlarmType[];
}

export default function AlarmModal({ isLoading, data }: IAlarmModalProps) {
  const { mutate } = useAlarm();
  return (
    <li
      className="w-[25rem] h-[25rem] bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14 overflow-auto"
      tabIndex={0}
      onMouseDown={(e) => {
        e.preventDefault();
      }}>
      <label htmlFor="alarm" className="text-center font-bold text-bs_16">
        알람
      </label>

      {isLoading && data?.length === 0 ? (
        data?.map((item: IAlarmType, index: number) => (
          <div key={index}>
            <label htmlFor="message" className="text-start">
              {item.alarmType}
            </label>
            <Link
              href={`/${item.postType}/${item.postId}`}
              onClick={() => mutate(item.id)}
              className="flex items-center gap-1">
              이동 <FaArrowRight />
            </Link>
          </div>
        ))
      ) : (
        <label htmlFor="message" className="text-start">
          알림이 없습니다.
        </label>
      )}
    </li>
  );
}
