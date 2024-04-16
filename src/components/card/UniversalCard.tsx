import Image from 'next/image';
import Link from 'next/link';

import Bookmark from '../button/Bookmark';

interface IUniversalCardProps {
  id: number;
  title: string;
  content: string;
  date?: string;
  image?: string;
  postType: string;
  size: 'large' | 'small';
  className?: string;
  hidden?: boolean;
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
  postType,
  size,
  className,
  hidden = true,
}: IUniversalCardProps) {
  const boxSize = sizeStyles[size || 'small'];

  return (
    <div
      className={`${boxSize} ${className} relative m-auto rounded-bs_10 border border-gary10 flex overflow-hidden  tablet:w-[767px] mobile:w-full`}>
      {hidden && (
        <Bookmark
          id={id}
          postType={postType.toUpperCase()}
          size={35}
          className="absolute -top-[0.375rem] right-5"
        />
      )}
      <Link
        href={
          postType.toLocaleLowerCase() === 'recruit'
            ? `/recruitment/${id}`
            : `/${postType}/${id}`
        }
        className="flex w-full">
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
        <ul className={`${image ? 'w-[70%] ' : 'w-full'} p-10 relative`}>
          <li className="mb-2">
            <h3 className="text-bs_24 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h3>
          </li>
          <li>
            <p
              className="text-bs_16 my-1 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: content }}></p>
          </li>
          {date && (
            <li className="text-bs_16 text-gray20 absolute bottom-6 right-8">
              <span>{date}</span>
            </li>
          )}
        </ul>
      </Link>
    </div>
  );
}
