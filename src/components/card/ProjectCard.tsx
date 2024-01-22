import Image from 'next/image';

import LikeButton from '@/components/button/LikeButton';
import Tag from '@/components/Tag';

interface ProjectCardProps {
  image?: string;
  title?: string;
  content?: string;
}

export default function ProjectCard({
  image,
  title,
  content,
}: ProjectCardProps) {
  return (
    <div>
      {image && (
        <div className=" bg-white relative overflow-hidden w-[23.75rem] border border-gray10 rounded-b-bs_20 max-w-[380px]">
          <Tag
            name="개인 프로젝트"
            category="individual"
            className="absolute right-3 top-3"
          />
          <figure className="">
            <Image
              src={image}
              alt="임시 프로젝트 이미지"
              layout="responsive"
              width={380}
              height={380}
              className="object-cover object-top rounded-b-bs_20 -z-[1] "
            />
          </figure>
          <figcaption className="w-full p-5 bg-white ab">
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
