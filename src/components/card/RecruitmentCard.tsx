import Link from 'next/link';

// import Bookmark from '../button/Bookmark';
import { IRecruitType } from '@/types/global';

interface IRecruitmentCardProps {
  item: IRecruitType;
}

export default function RecruitmentCard({ item }: IRecruitmentCardProps) {
  return (
    <div className="relative w-full h-[17.8125rem] bg-white border border-gray10 rounded-bs_10 py-8 px-5 overflow-hidden">
      {/* <Bookmark size={35} className="absolute -top-[0.375rem] right-5" /> */}
      <Link href={`${item.postType}/${item.id}`}>
        <h3 className="text-bs_18 pb-3 font-bold">{item.title}</h3>
        <p className="overflow-hidden text-ellipsis break-keep line-clamp-3">
          {item.content}
        </p>
        <ul className="flex py-6 gap-3">
          <li className="w-10 h-10 rounded-full border border-gray10 flex justify-center items-center">
            {item.techStack}
          </li>
          {/* ))} */}
        </ul>
        <div>
          모집인원 ({item.now}/{item.amount})
        </div>
      </Link>
    </div>
  );
}
