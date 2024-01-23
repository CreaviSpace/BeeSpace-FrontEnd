import Image from 'next/image';

import LikeButton from '@/components/button/LikeButton';
import Tag from '@/components/Tag';

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
    <div className="relative w-[290px] h-[350px] border border-gray10 rounded-b-bs_20">
      {/* <div className=" bg-white border border-gray10 "> */}
      <Tag
        name={tagName}
        category={tagCategory}
        className="absolute right-3 top-3"
      />
      {image && (
        <figure className="relative overflow-hidden w-full h-[180px]">
          <Image
            src={image}
            alt="임시 프로젝트 이미지"
            // layout="responsive"
            fill
            className="object-cover object-top -z-[1] "
          />
        </figure>
      )}
      <figcaption className="w-full h-full p-5 rounded-b-bs_20">
        <h3 className="text-bs_18 pb-3 font-bold">{title}</h3>
        <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
          {content}
        </p>
      </figcaption>
      <LikeButton className="absolute bottom-0 left-0" />
    </div>
    // </div>
  );
}
