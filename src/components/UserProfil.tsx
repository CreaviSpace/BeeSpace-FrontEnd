import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';

interface UserCircleProps {
  size?: number;
  color?: string;
  children?: string;
  className?: string;
}

export default function UserProfil({
  size = 30,
  color = '#AEB4B7',
  children,
  className,
}: UserCircleProps) {
  return (
    <button
      className={`${className} flex justify-between w-fit items-center cursor-pointer rounded-[.3125rem] border-gray20`}>
      <div
        aria-label={`${children} 프로필 사진`}
        className="bg-white rounded-full">
        <FaUserCircle color={color} size={size} />
      </div>
      <div className="text-gray40 pl-2">{children}</div>
    </button>
  );
}
