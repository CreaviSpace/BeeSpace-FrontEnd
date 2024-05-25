import Link from 'next/link';

import LikeButton from '@/components/button/LikeButton';
import UserProfileButton from '@/components/button/UserProfileButton';
import Tag from '@/components/Tag';
import { ICommunityType } from '@/types/global';

interface CommunityCardProps {
  item: ICommunityType;
  className?: string;
}
export default function CommunityCard({ item, className }: CommunityCardProps) {
  const onlyDate = item.createdDate?.split('T')[0];

  return (
    <div
      className={`${className} w-full py-5 px-7 rounded-bs_5 bg-white border-gray10`}>
      {/* 사용자 정보, 게시글 날짜 및 시간 */}
      <div className="pb-2 flex items-center justify-between">
        <UserProfileButton
          userName={item.memberNickName}
          imageURL={item.memberProfile}
          memberId={item.memberId}
        />
        <span className="text-bs_14 text-gray20">
          <time dateTime={item.createdDate}>{onlyDate}</time>
        </span>
      </div>
      <hr className="w-full m-auto" aria-hidden />
      {/* 게시글 내용, 조회수, 댓글, 좋아요 */}
      <div className="flow-root pt-4">
        <div>
          <Link href={`${item.postType.toLowerCase()}/${item.id}`}>
            <h2 className="font-bold text-bs_20 text-ellipsis break-keep line-clamp-1 mb-2">
              {item.title}
            </h2>
            <p
              className="overflow-hidden text-ellipsis break-keep line-clamp-2 mb-3 h-[50px]"
              dangerouslySetInnerHTML={{ __html: item.content }}></p>
          </Link>
          <div className="flex gap-2">
            {item.hashTags.map((hashTag, index) => (
              <Tag
                key={`${hashTag}-${index}`}
                name={hashTag.hashTag}
                category="hashtag"
              />
            ))}
          </div>
        </div>
        <Link href={`${item.postType.toLowerCase()}/${item.id}`}>
          <div className="pt-4 float-start flex gap-x-3 text-bs_14">
            <p>
              조회수 <span>{item.viewCount}</span>
            </p>
          </div>
        </Link>
        <LikeButton
          id={item.id}
          postType="COMMUNITY"
          className="pt-4 float-end"
        />
      </div>
    </div>
  );
}
