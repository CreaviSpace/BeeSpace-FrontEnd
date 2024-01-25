import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
// import Image from 'next/image';

interface UserCircleProps {
  size?: number;
  color?: string;
  children: string;
  userName: string;
  className?: string;
  imageURL?: string;
}

export default function UserProfilButton({
  size = 30,
  color = '#AEB4B7',
  children,
  className,
  userName,
  // imageURL,
}: UserCircleProps) {
  return (
    <button
      className={`${className} flex justify-between items-center w-fit cursor-pointer rounded-bs_5 border-gray20`}>
      <div
        aria-label={`${userName} 프로필 사진`}
        className="bg-white rounded-full">
        <FaUserCircle color={color} size={size} />
        {/* <Image src={imageURL} alt={`${userName} 프로필 사진`} className="w-32 h-auto" /> */}
      </div>
      <p className="text-gray40 pl-2">{children}</p>
    </button>
  );
}
