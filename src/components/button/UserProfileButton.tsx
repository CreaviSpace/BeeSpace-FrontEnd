import Image from 'next/image';

interface IUserProfileProps {
  size?: number;
  color?: string;
  userName?: string;
  className?: string;
  imageURL?: string;
}

export default function UserProfileButton({
  className,
  userName,
  imageURL,
}: IUserProfileProps) {
  return (
    <button
      className={`${className} flex justify-between items-center w-fit cursor-pointer rounded-bs_5 border-gray20`}>
      <div
        aria-label={`${userName} 프로필 사진`}
        className="bg-white rounded-full">
        {imageURL ? (
          <Image
            src={imageURL}
            alt={`${userName} 프로필 사진`}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Image
            src={'/img/user/default.avif'}
            alt={`${userName} 프로필 사진`}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
      <p className="text-gray40 pl-2">{userName}</p>
    </button>
  );
}
