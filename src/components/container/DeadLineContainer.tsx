import Image from 'next/image';
import Link from 'next/link';

import { card, images } from '@/utils/data';

import UniversalCard from '../card/UniversalCard';

export default function DeadLine() {
  const data = ['1', '2', '3'];

  return (
    <div className="w-full tablet:w-[767px] m-auto">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-5 text-bs_24">
          <Image
            src={'/img/icon/dateIcon.avif'}
            alt={'달력 아이콘'}
            width={28}
            height={35}
          />
          <h2 className="text-bs_24 font-bold">마감 모집</h2>
        </div>
        <Link href={`/recruitment?type=all`} className="text-gray20 text-bs_16">
          더 보기
        </Link>
      </div>
      {data.map((item) => (
        <UniversalCard
          key={`card-${item}`}
          id={card.id}
          title={card.title}
          content={card.content}
          date={'2020-02-12'}
          image={images[0]}
          size="small"
          className="my-5"
        />
      ))}
    </div>
  );
}
