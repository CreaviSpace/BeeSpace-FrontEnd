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
    <div>
      {image && (
        <div className=" bg-white border border-gray10 rounded-b-bs_20 w-fit">
          <figure className="relative overflow-hidden">
            <Tag
              name={tagName}
              category={tagCategory}
              className="absolute right-3 top-3"
            />
            <Image
              src={image}
              alt="임시 프로젝트 이미지"
              layout="responsive"
              width={300}
              height={300}
              className="object-cover object-top rounded-b-bs_20 -z-[1] "
            />
          </figure>
          <figcaption className="w-full p-5 rounded-b-bs_20">
            <h3 className="text-bs_18 pb-3 font-bold">{title}</h3>
            <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
              {content}
            </p>
            <LikeButton className="pt-5" />
          </figcaption>
        </div>
      )}
    </div>
  );
}
