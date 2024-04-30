import { useRouter } from 'next/router';

import useLogin from '@/store/useLogin';
import { deleteCookie } from '@/utils/deleteCookie';

interface IProfileModalProps {
  handleWriteModalOpen: () => void;
  handleAlarmModalOpen: () => void;
  setOnProfileModal: (onModal: boolean) => void;
  MID: string;
  isAlarm: boolean;
}

export default function ProfileModal({
  handleWriteModalOpen,
  handleAlarmModalOpen,
  setOnProfileModal,
  MID,
  isAlarm,
}: IProfileModalProps) {
  const router = useRouter();
  const { setLogout } = useLogin();
  const handleOnClicks = (url?: string, handle?: () => void) => {
    if (handle) {
      handle();
    }

    if (url) {
      router.push(url);
    }

    setOnProfileModal(false);
  };

  const handleLogout = () => {
    deleteCookie(['jwt', 'MID', 'OLD']);
    setLogout();
  };

  return (
    <li
      className="w-32 h-fit bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14"
      onMouseDown={(e) => {
        e.preventDefault();
      }}>
      <button
        className="text-start hidden min_mobile:block"
        onClick={() => handleOnClicks('', handleWriteModalOpen)}>
        글 작성하기
      </button>
      <button
        className="text-start"
        onClick={() => handleOnClicks(`/profile/${MID}`)}>
        내 프로필
      </button>
      <button
        className="flex items-center text-start"
        onClick={() => handleOnClicks('', handleAlarmModalOpen)}>
        알림
        {isAlarm && (
          <div className="ml-1 w-2 h-2 rounded-full bg-green-400"></div>
        )}
      </button>
      <button
        className="text-start"
        onClick={() => handleOnClicks(`/profile/${MID}`)}>
        북마크
      </button>
      <span className="w-full h-[1px] border block"></span>
      <button type="button" className="text-start" onClick={handleLogout}>
        로그아웃
      </button>
    </li>
  );
}
