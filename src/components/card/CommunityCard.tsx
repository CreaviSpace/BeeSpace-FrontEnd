import LikeButton from '@/components/button/LikeButton';
import UserProfilButton from '@/components/button/UserProfilButton';

interface CommunityCardProps {
  userName: string;
  date: string;
  contents: string;
  views: number;
  comments: number;
  className?: string;
}
export default function CommunityCard({
  userName,
  date,
  contents,
  views,
  comments,
  className,
}: CommunityCardProps) {
  const data = ['1', '2', '3', '4'];
  return (
    <>
      {data?.map((item, index) => (
        <div
          className={`${className} w-full py-5 px-7 rounded-[.3125rem] bg-white border-gray10`}
          key={`card-${index}`}>
          {/* 사용자 정보, 게시글 날짜 및 시간 */}
          <div className="pb-2 flex items-center justify-between">
            <UserProfilButton userName={userName} className="">
              {userName}
            </UserProfilButton>
            <span className="text-bs_14 text-gray20">
              <time dateTime={date}>{date}</time>
            </span>
          </div>
          <hr className="w-full m-auto" aria-hidden />
          {/* 게시글 내용, 조회수, 댓글, 좋아요 */}
          <div className="flow-root pt-4">
            <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
              {contents}
            </p>
            <div className="pt-4 float-start flex gap-x-3 text-bs_14">
              <p>
                조회수 <span>{views}</span>
              </p>
              <p>
                댓글 <span>{comments}</span>
              </p>
            </div>
            <LikeButton className="pt-4 float-end" />
          </div>
        </div>
      ))}
    </>
  );
}
