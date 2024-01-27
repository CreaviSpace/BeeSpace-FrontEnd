import Image from 'next/image';
import Link from 'next/link';

import Bookmark from '../button/Bookmark';

interface IUniversalCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  type?: string;
  size: 'large' | 'small';
  className?: string;
}

const sizeStyles = {
  large: 'w-[56.25rem] h-[12.8125rem]',
  small: 'w-[36.875rem] h-[12.8125rem]',
};

export default function UniversalCard({
  id,
  title,
  content,
  date,
  image,
  type,
  size,
  className,
}: IUniversalCardProps) {
  const boxSize = sizeStyles[size || 'small'];

  return (
    <div
      className={`${boxSize} ${className} relative m-auto rounded-bs_10 border border-gary10 flex overflow-hidden  tablet:w-[767px] mobile:w-full`}>
      <Bookmark size={35} className="absolute -top-[0.375rem] right-5" />
      <Link href={`${type}/${id}`} className="flex">
        {image && (
          <div className="relative w-[30%] h-full overflow-hidden ">
            <Image
              src={image}
              alt="이미지"
              fill
              className="object-cover object-left-top "
            />
          </div>
        )}
        <ul className={`${image ? 'w-[70%] ' : 'w-full'} p-10`}>
          <li className="text-bs_24">{title}</li>
          <li className="text-bs_16 my-1 line-clamp-3 ">{content}</li>
          <li className="text-bs_16 text-gray10">{date}</li>
        </ul>
      </Link>
    </div>
  );
}
