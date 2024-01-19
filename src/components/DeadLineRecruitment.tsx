import Image from 'next/image';
import Link from 'next/link';

import { card, images } from '@/utils/data';

import UniversalCard from './card/UniversalCard';

export default function DeadLine() {
  const data = ['1', '2', '3'];

  return (
    <div className="w-fit">
      <p className="flex justify-between items-end">
        <div className="flex items-center">
          <Image
            src={'/public/img/icon/dateIcon.png'}
            alt={'달력 아이콘'}
            width={32}
            height={40}
          />
          <span>마감 모집</span>
        </div>
        <div className="text-gray20 text-bs_16">
          <Link href={`/recruitment`}>더 보기</Link>
        </div>
      </p>
      {data.map((item) => (
        <UniversalCard
          key={`card-${item}`}
          id={card.id}
          title={card.title}
          content={card.content}
          date={'2020-02-12'}
          image={images[0]}
          size="smoll"
          className="my-5"
        />
      ))}
    </div>
  );
}
