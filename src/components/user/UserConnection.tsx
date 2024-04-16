import UserProfileButton from '../button/UserProfileButton';

interface IUserConnectiontProps {
  value: string;
  content: string;
  userName?: string;
  className?: string;
}

export default function UserConnection({
  value,
  content,
  userName,
  className,
}: IUserConnectiontProps) {
  return (
    <li className={`flex justify-start items-center ${className}`}>
      <UserProfileButton userName={userName} />
      <div className="flex flex-col justify-center items-start font-bold">
        <span>{value}</span>
        <span className="text-bs_14 text-gray20">{content}</span>
      </div>
    </li>
  );
}
