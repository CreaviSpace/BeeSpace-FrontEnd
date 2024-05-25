import Image from 'next/image';
import Link from 'next/link';

import { IRecruitType } from '@/types/global';

import BookmarkButton from '../button/BookmarkButton';

interface IRecruitmentCardProps {
  item: IRecruitType;
  type: string;
}

export default function RecruitmentCard({ item, type }: IRecruitmentCardProps) {
  return (
    <div className="relative w-full h-[17.8125rem] bg-white border border-gray10 rounded-bs_10 py-8 px-5 overflow-hidden">
      <BookmarkButton
        id={item.id}
        postType={item.postType}
        size={35}
        className="absolute -top-[0.375rem] right-5"
      />
      <Link href={`${type}/${item.id}`}>
        <h3 className="text-bs_18 pb-3 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {item.title}
        </h3>
        <p
          className="overflow-hidden text-ellipsis break-keep line-clamp-3 h-[72px]"
          dangerouslySetInnerHTML={{ __html: item.content }}></p>
        <div className="absolute bottom-5">
          <div className="flex gap-1">
            {item.techStacks?.map((item, index) => (
              <Image
                key={`${item}-${index}`}
                src={item.iconUrl}
                alt={item.techStack}
                width={35}
                height={35}
              />
            ))}
          </div>
          <div className="mt-4">
            모집인원 ({item.now}/{item.amount})
          </div>
        </div>
      </Link>
    </div>
  );
}
