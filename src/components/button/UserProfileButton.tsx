import Image from 'next/image';
import { useRouter } from 'next/router';

interface IUserProfileProps {
  size?: number;
  color?: string;
  userName?: string;
  className?: string;
  imageURL?: string;
  memberId: string;
}

export default function UserProfileButton({
  className,
  userName,
  imageURL,
  memberId,
}: IUserProfileProps) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/profile/${memberId}`);
  };
  return (
    <button
      className={`${className} flex justify-between items-center w-fit cursor-pointer rounded-bs_5 border-gray20`}
      onClick={handleOnClick}>
      <div
        aria-label={`${userName} 프로필 사진`}
        className="bg-white rounded-full">
        <Image
          src={imageURL ? imageURL : '/img/user/default.avif'}
          alt={`프로필 사진`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <p className="text-gray40 pl-2 min_mobile:text-bs_14">{userName}</p>
    </button>
  );
}
