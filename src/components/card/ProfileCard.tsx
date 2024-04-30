import Image from 'next/image';

import { IMemberProfileType } from '@/types/global';

interface IProfileCardProps {
  items: IMemberProfileType;
}

export default function ProfileCard({ items }: IProfileCardProps) {
  return (
    <div className="max-w-[22.4375rem] m-auto flex flex-col items-center gap-y-1">
      {items.profileUrl ? (
        <Image
          src={items.profileUrl}
          alt="유저 사진"
          width={100}
          height={100}
          className="rounded-full"
        />
      ) : (
        <Image
          src="/img/user/default.avif"
          alt="유저 사진"
          width={100}
          height={100}
          className="rounded-full"
        />
      )}
      <h2 className="text-bs_22 leading-5 font-bold mt-4">
        {items.memberNickname}
      </h2>
      <h3 className="text-base leading-tight text-gray30 font-bold">
        {items.memberId}
      </h3>
      <div className="text-bs_16 my-2 flex gap-2">
        <span>{`${items.memberCareer}년차`}</span>
        <p className="font-bold">{items.memberPosition}</p>
      </div>
      <p className="my-3 break-all">{items.memberIntroduce}</p>
      <div className="mt-2 flex gap-1">
        {items.memberInterestedStack.map((item, index) => (
          <span
            key={index}
            className="border rounded-full border-gray20 px-3 py-1">
            {item.techStack}
          </span>
        ))}
      </div>
    </div>
  );
}
