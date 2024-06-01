import RecruitmentCard from '@/components/card/RecruitmentCard';
import SkeletonRecruitmentCard from '@/components/skeleton/SkeletonRecruitmentCard';
import {
  TPostsType,
  useGetInfiniteRecruitPosts,
} from '@/hooks/queries/post/useGetInfinitePosts';
import useObserver from '@/hooks/useObserver';
import { IRecruitType } from '@/types/global';

interface IRecruitmentCardContainerProps {
  category?: string;
  size?: number;
  main?: boolean;
}

export default function RecruitmentCardContainer({
  category = 'all',
  size = 6,
  main,
}: IRecruitmentCardContainerProps) {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteRecruitPosts(category, size);

  const observerRef = useObserver(isFetchingNextPage, isError, fetchNextPage);

  return (
    <div className="max-w-max_w w-full my-10">
      <div className="grid grid-cols-3 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {isLoading || isError
          ? [1, 2, 3, 4, 5, 6].map((item, index) => (
              <SkeletonRecruitmentCard key={`${item}-${index}`} />
            ))
          : data?.pages.map((pages: TPostsType) => {
              return pages?.map((item, index) => (
                <div key={`${item}-${index}`}>
                  <RecruitmentCard
                    item={item as IRecruitType}
                    type="recruitment"
                  />
                </div>
              ));
            })}

        {!hasNextPage || main ? null : isFetchingNextPage ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <SkeletonRecruitmentCard key={`${item}-${index}`} />
          ))
        ) : (
          <div ref={observerRef} />
        )}
      </div>
    </div>
  );
}
