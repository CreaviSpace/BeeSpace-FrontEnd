import { useRouter } from 'next/router';

import useAdminContentGet from '@/hooks/admin/useAdminContentGet';
import { IUniversalType } from '@/types/global';

import UniversalCard from '../card/UniversalCard';
import SkeletonUniversalCard from '../skeleton/SkeletonUniversalCard';

export default function ContentManagement() {
  const router = useRouter();
  const { type } = router.query;

  const { isLoading, data, isFetchingNextPage, hasNextPage } =
    useAdminContentGet(type as string);

  return (
    <section className="w-full p-3">
      {isLoading ? (
        <SkeletonUniversalCard size="large" />
      ) : (
        <div className="p-3 bg-blue10">
          {data?.pages.map((item) => {
            return item.map((item: IUniversalType, index: number) => (
              <UniversalCard
                key={`${item}-${index}`}
                id={item.id}
                postType={item.postType}
                title={item.title}
                image={item.thumbnail ? item.thumbnail : ''}
                content={item.bannerContent ? item.bannerContent : item.content}
                hidden={false}
                size="large"
                className="border-2 border-gray20 mb-2 tablet:w-full bg-white"
              />
            ));
          })}
        </div>
      )}
    </section>
  );
}
