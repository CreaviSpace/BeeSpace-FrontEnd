import Image from 'next/image';
import Link from 'next/link';

import Tag from '@/components/Tag';

import { IProjectType } from '../../types/global';
import Bookmark from '../button/Bookmark';
import LikeButton from '../button/LikeButton';
import Icons from '../Icons';

interface IProjectCardProps {
  item: IProjectType;
  tagName: string;
}

export default function ProjectCard({ item, tagName }: IProjectCardProps) {
  return (
    <div className="relative max-w-md w-full m-auto h-[23.75rem] border border-gray10 rounded-b-bs_20">
      <Link href={`project/${item.id}`}>
        <Tag
          name={tagName}
          category={item.category as 'TEAM' | 'INDIVIDUAL'}
          className="absolute top-3 left-3"
        />
        {item.thumbnail && (
          <div className="relative overflow-hidden w-full h-[11.25rem]">
            <Image
              src={item.thumbnail}
              alt="임시 프로젝트 이미지"
              fill
              sizes="500px"
              className="object-cover object-top -z-[1] "
            />
          </div>
        )}
      </Link>
      <div className="w-full h-fit p-5 rounded-b-bs_20 relative overflow-hidden">
        <Bookmark
          className="absolute -top-[.3125rem] right-[.375rem]"
          size={35}
          id={item.id}
          postType={item.postType}
        />
        <Link href={`project/${item.id}`}>
          <h3 className="text-bs_18 mt-3 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {item.title}
          </h3>
          <p
            className={`overflow-hidden text-ellipsis break-keep ${!item.thumbnail ? 'line-clamp-[10]' : 'line-clamp-2'}`}>
            {item.bannerContent}
          </p>
        </Link>
      </div>
      <div className="absolute bottom-1 left-0 flex justify-between items-center pl-5 pr-2 w-full h-fit ">
        <LikeButton
          className="float-start"
          id={item.id}
          postType={item.postType}
        />
        <ul className="float-end flex items-center gap-1">
          {item.links?.map((item, index) => (
            <li key={`${item}-${index}`}>
              <Link href={item.url}>
                <Icons icon={item.linkType} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
