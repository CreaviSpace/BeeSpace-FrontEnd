import { useRouter } from 'next/router';

interface IProfileModalProps {
  handleWriteModalOpen: () => void;
  handleAlarmModalOpen: () => void;
  MID: string;
  isAlarm: boolean;
}

export default function ProfileModal({
  handleWriteModalOpen,
  handleAlarmModalOpen,
  MID,
  isAlarm,
}: IProfileModalProps) {
  const router = useRouter();
  return (
    <li
      className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14"
      onMouseDown={(e) => {
        e.preventDefault();
      }}>
      <button
        className="text-start hidden min_mobile:block"
        onClick={handleWriteModalOpen}>
        글 작성하기
      </button>
      <button
        className="text-start"
        onClick={() => router.push(`/profile/${MID}`)}>
        내 프로필
      </button>
      <button
        className="flex items-center text-start"
        onClick={handleAlarmModalOpen}>
        알림
        {isAlarm && (
          <div className="ml-1 w-2 h-2 rounded-full bg-green-400"></div>
        )}
      </button>
      <button className="text-start">북마크</button>
      <span className="w-full h-[1px] border block"></span>
      <button type="button" className="text-start">
        로그아웃
      </button>
    </li>
  );
}
