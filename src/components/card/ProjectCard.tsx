import Image from 'next/image';
import Link from 'next/link';

import Bookmark from '@/components/button/Bookmark';
import LikeButton from '@/components/button/LikeButton';
import Tag from '@/components/Tag';

interface IProjectCardProps {
  id?: string;
  type?: string;
  image?: string;
  title: string;
  content: string;
  tagName: string;
  tagCategory: 'team' | 'individual' | 'hashtag' | 'field';
}

export default function ProjectCard({
  id,
  type,
  image,
  title,
  content,
  tagName,
  tagCategory,
}: IProjectCardProps) {
  return (
    <div className="relative w-full h-[380px] border border-gray10 rounded-b-bs_20">
      <Link href={`${type}/${id}`}>
        <Tag
          name={tagName}
          category={tagCategory}
          className="absolute top-3 left-3"
        />
        {image && (
          <div className="relative overflow-hidden w-full h-[180px]">
            <Image
              src={image}
              alt="임시 프로젝트 이미지"
              fill
              className="object-cover object-top -z-[1] "
            />
          </div>
        )}
      </Link>
      <div className="w-full h-[200px] p-5 rounded-b-bs_20 relative overflow-hidden">
        <Bookmark
          className="absolute -top-[.3125rem] right-[.375rem]"
          size={35}
        />
        <Link href={`${type}/${id}`}>
          <h3 className="text-bs_18 pb-3 font-bold">{title}</h3>
          <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
            {content}
          </p>
        </Link>
      </div>
      <LikeButton className="absolute bottom-3 left-5" />
    </div>
  );
}
