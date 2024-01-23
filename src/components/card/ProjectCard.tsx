import Image from 'next/image';

import LikeButton from '@/components/button/LikeButton';
import Tag from '@/components/Tag';

import Bookmark from './../button/Bookmark';

interface ProjectCardProps {
  image?: string;
  title: string;
  content: string;
  tagName: string;
  tagCategory: 'team' | 'individual' | 'hashtag' | 'field';
}

export default function ProjectCard({
  image,
  title,
  content,
  tagName,
  tagCategory,
}: ProjectCardProps) {
  return (
    <div className="relative w-full border border-gray10 rounded-b-bs_20">
      <Tag
        name={tagName}
        category={tagCategory}
        className="absolute right-3 top-3"
      />
      {image && (
        <div className="relative overflow-hidden w-full h-[180px]">
          <Image
            src={image}
            alt="임시 프로젝트 이미지"
            // layout="responsive"
            fill
            className="object-cover object-top -z-[1] "
          />
        </div>
      )}
      <div className="w-full h-[200px] p-5 rounded-b-bs_20 relative overflow-hidden">
        <Bookmark
          className="absolute -top-[.3125rem] right-[.375rem]"
          size={35}
        />
        <h3 className="text-bs_18 pb-3 font-bold">{title}</h3>
        <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
          {content}
        </p>
      </div>
      <LikeButton className="absolute bottom-3 left-5" />
    </div>
  );
}
