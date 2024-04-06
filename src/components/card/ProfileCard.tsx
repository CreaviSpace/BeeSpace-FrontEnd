import Tag from '@/components/Tag';

interface IProfileCardProps {
  profileUrl?: string;
  memberNickname: string;
  career: string;
  position: string;
  introduce: string;
}

export default function ProfileCard({
  profileUrl,
  memberNickname,
  career,
  position,
  introduce,
}: IProfileCardProps) {
  return (
    <div className="max-w-[22.4375rem] m-auto flex flex-col items-center gap-y-1">
      {/* <Image
        src={profileUrl}
        alt="유저 사진"
        width={100}
        height={100}
        className="rounded-full"
      /> */}
      <h2 className="text-bs_20 font-bold">{memberNickname}</h2>
      <div className="text-bs_14 my-2">
        <span aria-label="경력">{career}</span>
        <p className="font-bold text-bs_16">{position}</p>
      </div>
      <p className="break-all">{introduce}</p>
      <div className="mt-3">
        <Tag name={`skill`} category="skill" />
      </div>
    </div>
  );
}
