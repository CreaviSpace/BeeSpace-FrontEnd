import Link from 'next/link';

import LikeButton from '@/components/button/LikeButton';
import UserProfileButton from '@/components/button/UserProfileButton';
import Tag from '@/components/Tag';

interface CommunityCardProps {
  id: number;
  type?: string;
  title: string;
  userName: string;
  date: string;
  contents: string;
  views: number;
  comments: number;
  className?: string;
}
export default function CommunityCard({
  id,
  type,
  title,
  userName,
  date,
  contents,
  views,
  comments,
  className,
}: CommunityCardProps) {
  return (
    <div
      className={`${className} w-full py-5 px-7 rounded-bs_5 bg-white border-gray10`}>
      {/* 사용자 정보, 게시글 날짜 및 시간 */}
      <div className="pb-2 flex items-center justify-between">
        <UserProfileButton userName={userName} />
        <span className="text-bs_14 text-gray20">
          <time dateTime={date}>{date}</time>
        </span>
      </div>
      <hr className="w-full m-auto" aria-hidden />
      {/* 게시글 내용, 조회수, 댓글, 좋아요 */}
      <div className="flow-root pt-4">
        <div>
          <Link href={`${type}/${id}`}>
            <h2 className="font-bold text-bs_20 mb-2">{title}</h2>
            <p
              className="overflow-hidden text-ellipsis break-keep line-clamp-2 mb-3"
              dangerouslySetInnerHTML={{ __html: contents }}></p>
          </Link>
          <Tag name="example" category="hashtag" />
        </div>
        <Link href={`${type}/${id}`}>
          <div className="pt-4 float-start flex gap-x-3 text-bs_14">
            <p>
              조회수 <span>{views}</span>
            </p>
            <p>
              댓글 <span>{comments}</span>
            </p>
          </div>
        </Link>
        <LikeButton id={id} postType="COMMUNITY" className="pt-4 float-end" />
      </div>
    </div>
  );
}
