import Image from 'next/image';
import Link from 'next/link';

import UniversalCard from '@/components/card/UniversalCard';
import useBanner from '@/hooks/useBanner';
import { IDeadLineType } from '@/types/global';

export default function DeadLineContainer() {
  const { isLoading, isError, data, isFetching } = useBanner('recruitment');

  return (
    <div className="w-full tablet:w-[767px] mx-auto mb-auto">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-5 text-bs_24">
          <Image
            src={'/img/icon/dateIcon.avif'}
            alt={'달력 아이콘'}
            width={28}
            height={35}
          />
          <h2 className="text-bs_24 font-bold">마감 모집</h2>
        </div>
        <Link href={`/recruitment?type=all`} className="text-gray40 text-bs_16">
          더 보기
        </Link>
      </div>
      {data?.map((item: IDeadLineType) => (
        <UniversalCard
          key={`Deadline-${item.id}`}
          id={item.id}
          postType={item.postType}
          title={item.title}
          content={item.content}
          date={item.modifiedDate}
          size="small"
          className="my-5"
        />
      ))}
    </div>
  );
}
