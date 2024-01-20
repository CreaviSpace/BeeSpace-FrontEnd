import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
// import Image from 'next/image';

interface UserCircleProps {
  size?: number;
  color?: string;
  children?: string;
  className?: string;
  userName?: string;
  imageURL?: string;
}

export default function UserProfil({
  size = 30,
  color = '#AEB4B7',
  children,
  className,
  userName,
  // imageURL,
}: UserCircleProps) {
  return (
    <button
      className={`${className} flex justify-between w-fit items-center cursor-pointer rounded-[.3125rem] border-gray20`}>
      <div
        aria-label={`${userName} 프로필 사진`}
        className="bg-white rounded-full">
        {/* <Image src={imageURL} alt={`${userName} 프로필 사진`}  className="w-32 h-auto" /> */}
        <FaUserCircle color={color} size={size} />
      </div>
      <div className="text-gray40 pl-2">{children}</div>
    </button>
  );
}
