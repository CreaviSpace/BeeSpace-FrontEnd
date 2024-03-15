import Image from 'next/image';
import Link from 'next/link';

import Tag from '@/components/Tag';

import { IProjectType } from '../../types/global';
import Icons from '../Icons';

interface IProjectCardProps {
  item: IProjectType;
  tagName: string;
  tagCategory: 'team' | 'individual' | 'hashtag' | 'field';
}

export default function ProjectCard({
  item,
  tagName,
  tagCategory,
}: IProjectCardProps) {
  return (
    <div className="relative max-w-md w-full m-auto h-[23.75rem] border border-gray10 rounded-b-bs_20">
      <Link href={`${item.postType}/${item.id}`}>
        <Tag
          name={tagName}
          category={tagCategory}
          className="absolute top-3 left-3"
        />
        {item.thumbnail && (
          <div className="relative overflow-hidden w-full h-[11.25rem]">
            <Image
              src={item.thumbnail}
              alt="임시 프로젝트 이미지"
              fill
              className="object-cover object-top -z-[1] "
            />
          </div>
        )}
      </Link>
      <div className="w-full h-fit p-5 rounded-b-bs_20 relative overflow-hidden">
        {/* <Bookmark
          className="absolute -top-[.3125rem] right-[.375rem]"
          size={35}
          id={item.id}
          kind={item.kind}
        /> */}
        <Link href={`${item.postType}/${item.id}`}>
          <h3 className="text-bs_18 pb-3 font-bold mt-5">{item.title}</h3>
          <p
            className={`overflow-hidden text-ellipsis break-keep ${!item.thumbnail ? 'line-clamp-[10]' : 'line-clamp-2'}`}>
            {item.bannerContent}
          </p>
        </Link>
      </div>
      <div className="flow-root px-5">
        {/* <LikeButton className="float-start" id={item.id} kind={item.kind} /> */}
        <ul className="float-end flex gap-1">
          {item.linkList?.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="border border-gray20 rounded-full w-6 h-6">
              <Link href={item.url}>
                <Icons icon={item.type} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
