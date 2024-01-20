import LikeButton from '@/components/button/LikeButton';
import UserProfil from '@/components/UserProfil';

interface CommunityItemStyle {
  userName?: string;
  date?: string;
  contents?: string;
  views?: number;
  comments?: number;
  className?: string;
}
export default function CommunityItem({
  userName,
  date,
  contents,
  views,
  comments,
  className,
}: CommunityItemStyle) {
  const data = ['1', '2', '3', '4'];
  return (
    <>
      {data.map((item) => (
        <div
          className={`${className} py-5 px-7 max-w-[43.75rem]`}
          key={`card-${item}`}>
          {/* 사용자 정보, 게시글 날짜 및 시간 */}
          <div className="pb-2 flex items-center justify-between">
            <UserProfil userName={userName}>{userName}</UserProfil>
            <span className="text-bs_14 text-gray20">
              <time dateTime={date}>{date}</time>
            </span>
          </div>
          <hr className="w-full m-auto" aria-hidden />
          {/* 게시글 내용, 조회수, 댓글, 좋아요 */}
          <div className="clearfixed pt-4">
            <p className="overflow-hidden text-ellipsis break-keep line-clamp-2">
              {contents}
            </p>
            <div className="pt-4 float-start flex gap-x-3">
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
